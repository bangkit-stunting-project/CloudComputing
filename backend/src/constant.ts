import process from "process";

export const JWT_KEY = process.env.JWT_KEY || 'oeatunoehsuaotnheu'
export const SERVER_PORT = process.env.PORT || '3000'
export const TOKEN_VALID_TIME = process.env.TOKEN_VALID_TIME || '2h'
export const ROOT_URL = process.env.ROOT_URL || 'localhost:3000'
