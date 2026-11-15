import "./AddPage.css";
import { type FC, type FormEvent, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../Routes";
import { createDraft, getDraft, publishDraft } from "../slices/draftSlice";
import { type AppDispatch } from "../store";

const DEFAULT_IMAGE = "/default-image.png";
const DEFAULT_VIDEO = "/default-video.mp4";

// Выбранный файл и URL для его предпросмотра. Старый URL освобождается при смене файла
const useFilePreview = () => {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<string>();

  const select = (newFile?: File) => {
    if (url) URL.revokeObjectURL(url);
    setFile(newFile);
    setUrl(newFile ? URL.createObjectURL(newFile) : undefined);
  };

  return { file, url, select };
};

// Шаг 1. Добавление: фото, видео и название процессора
const CreateStep: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((s: any) => s.draft);

  const [processor, setProcessor] = useState("");
  const image = useFilePreview();
  const video = useFilePreview();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(createDraft({ processor, image: image.file, video: video.file }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* fieldset с disabled блокирует все поля и кнопки внутри на время запроса */}
      <fieldset className="addForm" disabled={loading}>
      <div className="formSection mediaSection">
        <div className="mediaUpload">
          <label htmlFor="image" className="mediaLabel mediaLabelImage">
            <img src={image.url ?? DEFAULT_IMAGE} alt="Превью изображения" />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => image.select(e.target.files?.[0])}
          />
          <p className="mediaCaption">Изображение</p>
        </div>

        <div className="mediaUpload">
          <label htmlFor="video" className="mediaLabel mediaLabelVideo">
            <video
              src={video.url ?? DEFAULT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
            />
          </label>
          <input
            type="file"
            id="video"
            accept="video/*"
            hidden
            onChange={(e) => video.select(e.target.files?.[0])}
          />
          <p className="mediaCaption">Видео</p>
        </div>
      </div>

      <div className="formSection">
        <div className="formGroup">
          <label htmlFor="processor">Процессор</label>
          <input
            type="text"
            id="processor"
            value={processor}
            onChange={(e) => setProcessor(e.target.value)}
            placeholder="Например: RTX 4090"
            required
          />
        </div>
      </div>

      <button type="submit" className="submitBtn" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Далее"}
      </button>
      </fieldset>
    </form>
  );
};

// Шаг 2. Публикация: фото, видео и процессор только для чтения, остальные поля заполняются
const PublishStep: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { draft, loading } = useSelector((s: any) => s.draft);

  // если в черновике уже есть значения, подставляем их
  const [cores, setCores] = useState(draft?.cores ? String(draft.cores) : "");
  const [ram, setRam] = useState(draft?.ram ? String(draft.ram) : "");
  const [description, setDescription] = useState(draft?.description ?? "");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await dispatch(
      publishDraft({ cores: Number(cores), ram: Number(ram), description })
    );
    if (publishDraft.fulfilled.match(result)) {
      navigate(ROUTES.LIST);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* fieldset с disabled блокирует все поля и кнопки внутри на время запроса */}
      <fieldset className="addForm" disabled={loading}>
      <div className="formSection mediaSection">
        <div className="mediaUpload">
          <div className="mediaLabel mediaLabelImage mediaReadonly">
            <img
              src={draft?.image || DEFAULT_IMAGE}
              onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
              alt="Изображение"
            />
          </div>
          <p className="mediaCaption">Изображение</p>
        </div>

        <div className="mediaUpload">
          <div className="mediaLabel mediaLabelVideo mediaReadonly">
            <video
              src={draft?.video || DEFAULT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <p className="mediaCaption">Видео</p>
        </div>
      </div>

      <div className="formSection">
        <div className="formGroup">
          <label htmlFor="processor">Процессор</label>
          <input type="text" id="processor" value={draft?.processor ?? ""} readOnly />
        </div>

        <div className="formGroup">
          <label htmlFor="cores">Количество ядер</label>
          <input
            type="number"
            id="cores"
            min={1}
            value={cores}
            onChange={(e) => setCores(e.target.value)}
            placeholder="Например: 20"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="ram">Объём RAM (ГБ)</label>
          <input
            type="number"
            id="ram"
            min={1}
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            placeholder="Например: 32"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание"
          />
        </div>
      </div>

      <button type="submit" className="submitBtn" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Опубликовать"}
      </button>
      </fieldset>
    </form>
  );
};

export const AddPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((s: any) => s.user.isAuthenticated);
  const { draft, loading, error } = useSelector((s: any) => s.draft);

  // при открытии страницы проверяем, есть ли у пользователя черновик
  useEffect(() => {
    if (isAuth) {
      dispatch(getDraft());
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <div className="addPage">
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && !draft ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : draft ? (
        <PublishStep />
      ) : (
        <CreateStep />
      )}
    </div>
  );
};
