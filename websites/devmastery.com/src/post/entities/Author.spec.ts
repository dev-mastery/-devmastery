import * as faker from "faker";
import { Slug } from "../../common/entities";
import { Author } from "./Author";

describe("Author", () => {
  it("Generates a slug.", () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`; //?
    const expected = Slug.from(name).toString(); //?
    expect(Author.from(name).slug).toBe(expected);
  });

  it("Exposes a name.", () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`; //?
    expect(Author.from(name).name).toBe(name);
  });

  it("Serializes to JSON.", () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`; //?
    const slug = Slug.from(name).toString(); //?
    const authorJSON = {
      name,
      slug,
    };
    const author = Author.from(name);

    expect(author.toJSON()).toEqual(authorJSON);
    expect(JSON.stringify(author)).toBe(JSON.stringify(authorJSON));
    expect(JSON.parse(JSON.stringify(author))).toEqual(authorJSON);
  });
});
