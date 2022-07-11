export class HttpRequest {
  constructor(service) {
    this.service = service;
  }
  async get() {
    return await this.service.get();
  }
  async patch(id, data) {
    await this.service.patch(`/${id}`, data);
  }
}
