resource "yandex_iam_service_account" "admin1" {
  name        = "admin1"
  folder_id   = var.folder_id
}
# Назначаем роль storage.admin этому сервисному аккаунту
resource "yandex_iam_service_account_iam_binding" "admin1_admin_role" {
  service_account_id = yandex_iam_service_account.admin1.id
  role="admin"
  members = [
      "serviceAccount:${yandex_iam_service_account.admin1.id}"
      ]
}
