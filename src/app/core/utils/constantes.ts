export default class Constantes {
  public static USUARIO_CREACION = 'ADMIN';

  // Estados
  public static ESTADO_ACTIVO_SIMPLE = 'A';
  public static ESTADO_INACTIVO_SIMPLE = 'I';
  public static ESTADO_ANULADO_SIMPLE = 'N';
  public static ESTADO_ACTIVO_COMPUESTO = 'ACT';
  public static ESTADO_INACTIVO_COMPUESTO = 'INA';
  public static ESTADO_ANULADO_COMPUESTO = 'ANU';
  public static ESTADO_BLOQUEADO_CUPO_COMPUESTO = 'BLC';
  public static ESTADO_BLOQUEADO_COMPUESTO = 'BLO';
  public static ESTADO_ACTIVO_LABEL = 'ACTIVO';
  public static ESTADO_INACTIVO_LABEL = 'INACTIVO';

  // Dimensiones Imagenes width x height
  public static RESTRICCION_IMAGEN_NOTIFICACION = '300x150';
  public static RESTRICCION_IMAGEN_PUBLICIDAD = '416x183';
  public static RESTRICCION_IMAGEN_CATEGORIA = '300x300';
  public static RESTRICCION_IMAGEN_PRODUCTO = '300x300';
  public static RESTRICCION_IMAGEN_MARCA = '300x300';
  public static RESTRICCION_IMAGEN_VIDEO = '300x300';

  // Coleccion Imagenes
  public static COLECCION_IMG_PUBLICIDAD = 'publicidades';
  public static COLECCION_IMG_PRODUCTO = 'productos';
  public static COLECCION_IMG_CATEGORIA = 'categorias';
  public static COLECCION_IMG_VIDEO = 'videos';
  public static COLECCION_IMG_NOTIFICACION_PUSH = 'notificacionesPush' 

  // Tipo Imagenes
  public static TIPO_IMG_PUBLICIDAD = 'PUB';
  public static TIPO_IMG_CATEGORIA = 'CAT';
  public static TIPO_IMG_PRODUCTO = 'PRO';
  public static TIPO_IMG_VIDEO = 'VID';
  public static TIPO_IMG_NOTIFICACION_PUSH = 'NOT';

  //Tipo Columnas Tabla
  public static TIPO_COLUMNA_TEXTO = 'T';
  public static TIPO_COLUMNA_SELECT = 'S';
  public static TIPO_COLUMNA_LIST = 'L';
  public static TIPO_COLUMNA_MONEDA = 'M';
  public static TIPO_COLUMNA_NUMERO = 'N';
  public static TIPO_COLUMNA_IMAGEN = 'I';
  public static TIPO_COLUMNA_BADGE = 'B';
  public static TIPO_COLUMNA_FECHA = 'F';
  public static TIPO_COLUMNA_CHECK = 'C';
  public static TIPO_COLUMNA_ACCIONES = 'A';

  public static RESPUESTA_AFIRMATIVA = 'S';
  public static RESPUESTA_NEGATIVA = 'N';

  // Notificacion Key
  public static NOTIFICACION_KEY_ACT_CUPO = 'K_ACT_CUPO';
  public static NOTIFICACION_KEY_RATING = 'K_RAT_SERVICIO';
  public static NOTIFICACION_KEY_URL_EXTERNA = 'K_URL_EXTERNA';
  public static NOTIFICACION_KEY_ENCUESTA = 'K_ENCUESTA_FORM';

  // Roles
  public static ROLE_ADMINISTRADOR = 'ADMINISTRADOR';

  // KEY LOCALSTORAGE
  public static LOC_KEY_SESSION = 'K_TOKEN_SESSION';


  public static LOC_KEY_SESSION_ENTRY_ID = '06986c11-cc49-4230-b1ab-81d40a5f0883.dd4b5bbf-437e-4614-89ee-2ab4c3524e32-login.windows.net-accesstoken-95e5c45e-8276-40c9-9626-9dee65b9a8e0-dd4b5bbf-437e-4614-89ee-2ab4c3524e32-openid profile user.read email--';

  
  // Css Badge
  public static CSS_BADGE_ROJO = 'status-red';
  public static CSS_BADGE_VERDE = 'status-green';
  public static CSS_BADGE_CAFE = 'status-brown';
  public static CSS_BADGE_MORADO = 'status-purple';
  public static CSS_BADGE_AZUL = 'status-blue';

  //ACCIONES PARA LAS FILAS DE LA TABLA
  public static ACCION_ELIMINAR = 'acction-delete';
  public static ACCION_EDITAR = 'acction-edit';
  public static ACCION_VER = 'acction-view';
  public static ACCION_APROBAR = 'acction-approve';
  public static ACCION_RECHAZAR = 'acction-reject';
  public static ACCION_DESCARGAR = 'acction-reject';

  // TIPOS DE PIPES
  public static PIPE_CURRENCY = 'Currency';
  public static PIPE_NUMBER = 'Number';

  // CODIGO RESPUESTA
  public static CODIGO_RESPUESTA_EXITOSO = '0';
  public static CODIGO_RESPUESTA_ERROR = '9999';
  public static CODIGO_RESPUESTA_ERROR_VALIDACION = '1';

  //ESTADO
  public static Estados = [
    {
      value: true,
      name: 'Activo',
    },
    {
      value: false,
      name: 'Inactivo',
    },
  ];

  //CISLATAM - COMPROBANTE
  public static VER_COMPROBANTE = 'V';
  public static DESCARGAR_COMPROBANTE = 'D';
  public static APROBAR_COMPROBANTE = 'A';
  public static RECHAZAR_COMPROBANTE = 'R';
  public static ACCION_RECHAZAR_COMPROBANTE: 'RC';

}
