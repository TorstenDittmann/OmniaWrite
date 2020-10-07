import { insert, noop } from "svelte/internal";

/**
 * Create slot for element
 *
 * Adapted from @storybook/svelte/src/client/preview/render.ts
 */
function createSlotFn(element) {
  return [
    () => ({
      c: noop,
      m: (target, anchor) => insert(target, element, anchor),
      d: noop,
      l: noop,
    }),
  ];
}

/**
 * Create slots
 *
 * Adapted from @storybook/svelte/src/client/preview/render.ts
 *
 * @param {{[slotName: string]: function}} slots
 */
function createSlots(slots) {
  return Object.entries(slots).reduce((acc, [slotName, elementFn]) => {
    acc[slotName] = createSlotFn(elementFn());
    return acc;
  }, {});
}

/**
 * Build Svelte component slot properties
 *
 * @param {{[slotName: string]: function}} slots
 */
export const getSlotProps = slots => ({
  $$slots: createSlots(slots),
  $$scope: {},
});

/**
 * Populate component slots
 *
 * @param {{[slotName: string]: function}} slots
 */
export const withSlots = slots => storyFn => {
  const storyObj = storyFn();
  const { props } = storyObj;

  return {
    ...storyObj,
    props: {
      ...props,
      ...getSlotProps(slots),
    },
  };
};

/** Populate slot with text node */
export const fromText = string => () => document.createTextNode(string);

/** Populate slot with HTML */
export const fromHTML = string => () =>
  document.createRange().createContextualFragment(string);

/** Populate slot with components */
export const intoTarget = componentsFn => () => {
  const target = document.createDocumentFragment();
  componentsFn(target);
  return target;
};
