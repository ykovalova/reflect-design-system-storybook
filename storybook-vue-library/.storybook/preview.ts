import type { Preview } from "@storybook/vue3-vite";

import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Foundations", ["Colors", "Spacing", "Typography"], "Components", ["Button"]]
      }
    }
  }
};

export default preview;
