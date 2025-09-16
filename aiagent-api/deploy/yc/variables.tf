# variables.tf
variable "yandex_token" {
  description = "OAuth токен для аутентификации в Yandex Cloud."
  type        = string
}

variable "cloud_id" {
  description = "Идентификатор облака (Cloud ID)."
  type        = string
}

variable "folder_id" {
  description = "Идентификатор каталога (Folder ID)."
  type        = string
}
variable "aiagent_api_environment" {
  description = "Environment variable for aiagent container"
  type        = map(string)
}