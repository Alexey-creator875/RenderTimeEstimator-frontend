/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DsRenderServerUnit {
  cores?: number;
  description?: string;
  id?: number;
  image?: string;
  processor?: string;
  ram?: number;
  status?: string;
  video?: string;
}

export interface HandlerErrorResponse {
  /** @example "описание ошибки" */
  error?: string;
}

export interface HandlerLikeRequest {
  like?: boolean;
}

export interface HandlerMessageResponse {
  /** @example "запись успешно удалена" */
  message?: string;
}

export interface HandlerRenderServerUnitDetail {
  cores?: number;
  description?: string;
  id?: number;
  image?: string;
  is_liked?: boolean;
  likes_number?: number;
  processor?: string;
  ram?: number;
  status?: string;
  video?: string;
}

export interface HandlerRenderServerUnitDetailResponse {
  renderServerUnit?: HandlerRenderServerUnitDetail;
}

export interface HandlerRenderServerUnitListItem {
  cores?: number;
  description?: string;
  id?: number;
  image?: string;
  is_mine?: boolean;
  likes_number?: number;
  processor?: string;
  ram?: number;
  status?: string;
  video?: string;
}

export interface HandlerRenderServerUnitMessageResponse {
  message?: string;
  renderServerUnit?: DsRenderServerUnit;
}

export interface HandlerRenderServerUnitResponse {
  renderServerUnit?: DsRenderServerUnit;
}

export interface HandlerRenderServerUnitsResponse {
  /** @example "128" */
  max?: string;
  /** @example "8" */
  min?: string;
  renderServerUnits?: HandlerRenderServerUnitListItem[];
}

export interface HandlerLoginReq {
  login?: string;
  password?: string;
}

export interface HandlerLoginResp {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
}

export interface HandlerRegisterReq {
  login?: string;
  password?: string;
}

export interface HandlerRegisterResp {
  ok?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title No title
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Возвращает черновик услуги, созданный текущим пользователем. Только для создателя.
     *
     * @tags RenderServerUnits
     * @name DraftRenderServerUnitsList
     * @summary Получить черновик текущего пользователя
     * @request GET:/api/draft-render-server-units
     * @secure
     */
    draftRenderServerUnitsList: (params: RequestParams = {}) =>
      this.request<HandlerRenderServerUnitResponse, HandlerErrorResponse>({
        path: `/api/draft-render-server-units`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает опубликованные услуги. Фильтр по RAM: параметры min и max нужно передавать вместе, без них возвращаются все услуги. Доступно без авторизации.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsList
     * @summary Список опубликованных серверов
     * @request GET:/api/render-server-units
     */
    renderServerUnitsList: (
      query?: {
        /** Минимальный объём RAM */
        min?: number;
        /** Максимальный объём RAM */
        max?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerRenderServerUnitsResponse, HandlerErrorResponse>({
        path: `/api/render-server-units`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Заполняет поля черновика текущего пользователя и переводит его в статус published.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsUpdate
     * @summary Опубликовать черновик
     * @request PUT:/api/render-server-units
     * @secure
     */
    renderServerUnitsUpdate: (
      data: {
        /** Количество ядер */
        cores?: number;
        /** Объём RAM */
        ram?: number;
        /** Описание */
        description?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerRenderServerUnitMessageResponse,
        HandlerErrorResponse
      >({
        path: `/api/render-server-units`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Создаёт черновик с картинкой и видео. Создатель подставляется автоматически. Максимальный размер формы 2 МБ.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsCreate
     * @summary Создать черновик услуги
     * @request POST:/api/render-server-units
     * @secure
     */
    renderServerUnitsCreate: (
      data: {
        /** Название процессора */
        processor: string;
        /**
         * Изображение (jpeg, png, gif, webp)
         * @format binary
         */
        image?: File;
        /**
         * Видео (mp4, webm, mov, avi, mkv)
         * @format binary
         */
        video?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerRenderServerUnitMessageResponse,
        HandlerErrorResponse
      >({
        path: `/api/render-server-units`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Без параметра next возвращает услугу с указанным id. С next=true возвращает следующую за ней в ленте. Доступно без авторизации.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsDetail
     * @summary Получить сервер по id или следующий за ним
     * @request GET:/api/render-server-units/{id}
     */
    renderServerUnitsDetail: (
      id: number,
      query?: {
        /** Если true, вернуть следующую услугу */
        next?: "true";
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerRenderServerUnitDetailResponse, HandlerErrorResponse>(
        {
          path: `/api/render-server-units/${id}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description Удаляет услугу. Доступно только её создателю.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsDelete
     * @summary Удалить услугу
     * @request DELETE:/api/render-server-units/{id}
     * @secure
     */
    renderServerUnitsDelete: (id: number, params: RequestParams = {}) =>
      this.request<
        HandlerMessageResponse,
        HandlerErrorResponse | HandlerMessageResponse
      >({
        path: `/api/render-server-units/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description like=true ставит лайк (201), like=false снимает (200). Повторный лайк не создаёт дубликат.
     *
     * @tags RenderServerUnits
     * @name RenderServerUnitsLikeCreate
     * @summary Поставить или убрать лайк
     * @request POST:/api/render-server-units/{id}/like
     * @secure
     */
    renderServerUnitsLikeCreate: (
      id: number,
      body: HandlerLikeRequest,
      params: RequestParams = {},
    ) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/api/render-server-units/${id}/like`,
        method: "POST",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Проверяет логин и пароль и возвращает JWT. Токен передаётся в заголовке Authorization: Bearer <токен>.
     *
     * @tags User
     * @name SignInCreate
     * @summary Аутентификация
     * @request POST:/api/sign-in
     */
    signInCreate: (body: HandlerLoginReq, params: RequestParams = {}) =>
      this.request<HandlerLoginResp, void>({
        path: `/api/sign-in`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет текущий JWT в блеклист Redis до истечения срока его жизни. После этого токен перестаёт приниматься.
     *
     * @tags User
     * @name SignOutCreate
     * @summary Выход
     * @request POST:/api/sign-out
     * @secure
     */
    signOutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/sign-out`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Создаёт нового пользователя с ролью Guest. Пароль хранится в виде хеша.
     *
     * @tags User
     * @name SignUpCreate
     * @summary Регистрация
     * @request POST:/api/sign-up
     */
    signUpCreate: (body: HandlerRegisterReq, params: RequestParams = {}) =>
      this.request<HandlerRegisterResp, void>({
        path: `/api/sign-up`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
