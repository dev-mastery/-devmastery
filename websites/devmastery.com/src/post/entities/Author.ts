import { Name, Slug } from "../../common/entities";

interface AuthorProps {
  name: Name;
  slug: Slug;
}

export class Author {
  readonly #name: string;
  readonly #slug: string;

  private constructor(props: AuthorProps) {
    this.#name = props.name.toString();
    this.#slug = props.slug.toString();
  }

  public static of(props: { name: Name; slug: Slug }): Author {
    return new Author(props);
  }

  public static from(authorName: string): Author {
    const name = Name.of(authorName);
    const slug = Slug.from(authorName);
    return new Author({ name, slug });
  }

  public get slug(): string {
    return this.#slug;
  }

  public get name(): string {
    return this.#name;
  }

  public toJSON(): AuthorInfo {
    return {
      name: this.name,
      slug: this.slug,
    };
  }
}

export interface AuthorInfo {
  name: string;
  slug: string;
}
