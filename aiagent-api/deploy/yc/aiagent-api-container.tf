
resource "yandex_container_registry" "container-registry" {
  name = "container-registry"
  folder_id = var.folder_id

}

resource "yandex_serverless_container" "aiagent-api" {
  name               = "aiagent-api"
  memory             = 128
  cores              = 1
  service_account_id = resource.yandex_iam_service_account.admin1.id
  runtime {
    type = "http"
  }
  image {
      url = "cr.yandex/${resource.yandex_container_registry.container-registry.id}/aiagent-api"
      environment = var.aiagent_api_environment
  }
}