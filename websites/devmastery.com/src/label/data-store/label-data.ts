import { OperationalError } from "@devmastery/error";

export function makeLabelDataStore({ labels }: { labels: Labels }) {
  return Object.freeze({ get });

  async function get({ key, namespace }: { namespace: string; key: string }) {
    const ns = await getNamespaceObject(namespace);

    const label = ns[key];

    return label ?? null;
  }

  async function getNamespaceObject(namespace: string) {
    const ns = labels[namespace];
    if (ns == null) throw new MissingNamespaceError(namespace);
    return ns;
  }
}

type Labels = {
  [key: string]: { [key: string]: { [key in Locale]?: string } };
};

export type Namespace = "glossary" | "navigation" | "common";

class MissingNamespaceError extends OperationalError {
  constructor(namespace: string) {
    super({
      message: `Namespace "${namespace}" is missing.`,
      mergeFields: { namespace },
      context: "Getting label data.",
    });
  }
}

class MissingLabelError extends OperationalError {
  constructor(namespace: string, key: string) {
    super({
      message: `Namespace "${namespace}" has no key named "${key}".`,
      mergeFields: { namespace, key },
      context: "Getting label data.",
    });
  }
}
