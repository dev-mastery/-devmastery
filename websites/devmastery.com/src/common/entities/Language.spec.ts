import { Language } from "./Language";
describe("Language", () => {
  it("supports language only locales", () => {
    const english = Language.from("en");
    expect(english.name).toBe("English");
    expect(english.nativeName).toBe("English");

    const french = Language.from("fr");
    expect(french.name).toBe("French");
    expect(french.nativeName).toBe("français");
  });

  it("supports variants", () => {
    const english = Language.from("en-CA");
    expect(english.name).toBe("English (Canada)");
    expect(english.nativeName).toBe("English (Canada)");

    const englishUS = Language.from("en-US");
    expect(englishUS.name).toBe("English (United States)");
    expect(englishUS.nativeName).toBe("English (United States)");

    const french = Language.from("fr-CA");
    expect(french.name).toBe("French (Canada)");
    expect(french.nativeName).toBe("français (Canada)");

    const frenchBE = Language.from("fr-BE");
    expect(frenchBE.name).toBe("French (Belgium)");
    expect(frenchBE.nativeName).toBe("français (België)");
  });

  it("serializes", () => {
    const swissGerman = Language.from("de-CH");
    const expected = {
      locale: "de-CH",
      name: "German (Switzerland)",
      nativeName: "Deutsch (Schweiz)",
    };

    expect(swissGerman.toJSON()).toEqual(expected);
    expect(JSON.stringify(swissGerman)).toBe(JSON.stringify(expected));
  });
});
