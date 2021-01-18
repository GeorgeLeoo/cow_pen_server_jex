// mongo db
const MONGO = {
  host: '139.159.201.22',
  port: '12306',
  db: 'cow_pen',
  authSource: 'admin',
  username: 'root',
  password: '123loveyou,',
  // 若 remove 为 true 是，则为真删除， 为 false 时，为假删除，即用 insert 方法模拟, 默认为false
  remove: false
}

// redis
const REDIS = {
	host: '139.159.201.22',
	port: 15001,
	password: '123loveyou,',
}

// jwt
const JWT_SECRET =
	'a&*38QthAK8ui2RwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'

// token 过期时间
const TOKEN_EXP = Math.floor(Date.now() / 1000) + 60 * 60 * 24

// 不用授权的api
const UN_AUTHENTICATION_API_REG = [/\/user\/login/, /\/user\/register/]
const UN_AUTHENTICATION_API = ['/user/login', '/user/register']

// 媒体文件基础路径
const ABSOLUTE_BASE_PATH = '/root/www/media'
const RELATIVE_BASE_PATH = '/media'

// 图片地址
const ABSOLUTE_IMG_LOCAL_PATH = `/Users/georgeleeo/Documents/file/Graduation Project/ExamManagement/ExamManagement/media/img/`
const ABSOLUTE_IMG_PATH = `${ABSOLUTE_BASE_PATH}/img/`
const RELATIVE_IMG_PATH = `${RELATIVE_BASE_PATH}/img/`

// 头像地址
const ABSOLUTE_AVATAR_PATH = `${ABSOLUTE_BASE_PATH}/avatar/`
const RELATIVE_AVATAR_PATH = `${RELATIVE_BASE_PATH}/avatar/`

// 图片后缀
const PICTURE_SUFFIX = ['png', 'jpg', 'jpeg']

module.exports = {
  	MONGO,
	REDIS,
	JWT_SECRET,
	UN_AUTHENTICATION_API,
	UN_AUTHENTICATION_API_REG,
	TOKEN_EXP,
	ABSOLUTE_BASE_PATH,
	RELATIVE_BASE_PATH,
	ABSOLUTE_IMG_PATH,
	RELATIVE_IMG_PATH,
	ABSOLUTE_AVATAR_PATH,
	RELATIVE_AVATAR_PATH,
	PICTURE_SUFFIX,
	ABSOLUTE_IMG_LOCAL_PATH,
}
