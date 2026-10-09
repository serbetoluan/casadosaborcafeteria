import { describe, expect, it } from "bun:test";
import { STORE_OPTIONS, WHATSAPP_NUMBER } from "./menuData";

describe("loja disponível na finalização", () => {
  it("oferece somente a Loja 1", () => {
    expect(Object.keys(STORE_OPTIONS)).toEqual(["loja1"]);
  });

  it("envia pedidos da Loja 1 ao novo WhatsApp", () => {
    expect(STORE_OPTIONS.loja1.whatsapp).toBe("5564999766781");
    expect(WHATSAPP_NUMBER).toBe("5564999766781");
  });
});