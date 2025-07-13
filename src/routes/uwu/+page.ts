import type { PageLoad } from "./$types";

export const load = (async () => {
    return {
        summaryItems: [{title: "intro", link: "#intro"}, {title: "Garudaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", link: "#garuda"}, {title: "Ifrit", link: "#ifrit"}, {title: "Titan", link: "#titan"}, {title: "Ultima", link: "#ultima"}],
    };
}) satisfies PageLoad;