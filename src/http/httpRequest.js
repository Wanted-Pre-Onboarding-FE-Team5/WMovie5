export class HttpRequest {
  constructor(service) {
    this.service = service;
  }
  async get() {
    const response = await this.service.get().catch((err) => {
      console.log(err);
      alert(err + "Check the server");
      return { data: [] };
    });
    return response;
  }
  async patch(id, data) {
    await this.service.patch(`/${id}`, data);
  }
}
