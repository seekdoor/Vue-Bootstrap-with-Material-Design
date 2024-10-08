<template>
  <input
    v-if="!wrap"
    :class="inputClassName"
    :id="uid"
    :value="inputValue"
    v-bind="$attrs"
    @input="handleInput"
    ref="inputRef"
    v-mdb-click-outside="clickOutside"
    @focus="handleFocus"
    @blur="handleBlur"
  />
  <label
    v-if="label && !wrap"
    ref="labelRef"
    :class="labelClassName"
    :for="uid"
  >
    {{ label }}
  </label>
  <div class="form-helper" v-if="!wrap && helper">{{ helper }}</div>
  <div class="form-helper" v-if="!wrap && counter">
    <div class="form-counter">{{ currentLength }} / {{ maxlength }}</div>
  </div>
  <slot v-if="!wrap" />
  <div v-if="!wrap && validFeedback" :class="validFeedbackClassName">
    {{ validFeedback }}
  </div>
  <div v-if="!wrap && customInvalidFeedback" :class="invalidFeedbackClassName">
    {{ customInvalidFeedback }}
  </div>
  <div v-if="!wrap && formOutline" class="form-notch" ref="notchRef">
    <div
      class="form-notch-leading"
      :style="{ width: `${notchLeadingWidth}px` }"
    ></div>
    <div
      class="form-notch-middle"
      :style="{ width: `${notchMiddleWidth}px` }"
    ></div>
    <div class="form-notch-trailing"></div>
  </div>
  <component
    v-if="wrap"
    :is="tag"
    :class="wrapperClassName"
    :style="validationStyle"
    v-mdb-click-outside="clickOutside"
  >
    <slot name="prepend" />
    <input
      :class="inputClassName"
      v-bind="$attrs"
      :id="uid"
      :value="inputValue"
      @input="handleInput"
      ref="inputRef"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <label v-if="label" ref="labelRef" :class="labelClassName" :for="uid">
      {{ label }}
    </label>
    <div class="form-helper" v-if="helper">{{ helper }}</div>
    <div class="form-helper" v-if="counter">
      <div class="form-counter">{{ currentLength }} / {{ maxlength }}</div>
    </div>
    <slot></slot>
    <div v-if="validFeedback" :class="validFeedbackClassName">
      {{ validFeedback }}
    </div>
    <div v-if="customInvalidFeedback" :class="invalidFeedbackClassName">
      {{ customInvalidFeedback }}
    </div>
    <div v-if="formOutline" class="form-notch" ref="notchRef">
      <div
        class="form-notch-leading"
        :style="{ width: `${notchLeadingWidth}px` }"
      ></div>
      <div
        class="form-notch-middle"
        :style="{ width: `${notchMiddleWidth}px` }"
      ></div>
      <div class="form-notch-trailing"></div>
    </div>
  </component>
  <div v-if="formText" class="form-text">{{ formText }}</div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUpdated,
  watchEffect,
  onUnmounted,
  watch,
  useAttrs,
} from "vue";

import { on, off } from "../../utils/MDBEventHandlers";
import { getUID } from "../../utils/getUID";
import vMdbClickOutside from "../../../../src/directives/free/mdbClickOutside";

const props = defineProps({
  id: String,
  label: String,
  labelClass: String,
  modelValue: [String, Number, Date],
  size: String,
  formOutline: {
    type: Boolean,
    default: true,
  },
  wrapperClass: String,
  inputGroup: {
    type: [Boolean, String],
    default: false,
  },
  wrap: {
    type: Boolean,
    default: true,
  },
  formText: String,
  white: Boolean,
  validationEvent: String,
  isValidated: Boolean,
  isValid: Boolean,
  validFeedback: String,
  invalidFeedback: String,
  tooltipFeedback: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: "div",
  },
  helper: String,
  counter: Boolean,
  maxlength: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue", "click-outside", "on-validate"]);

const attrs = useAttrs();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(props.modelValue);
const labelRef = ref<HTMLLabelElement | null>(null);
const showPlaceholder = ref(false);
const notchLeadingWidth = ref(9);
const notchMiddleWidth = ref(0);
const uid = props.id || getUID("MDBInput-");
const isFocused = ref(false);

const wrapperClassName = computed(() => {
  return [
    props.formOutline && "form-outline",
    inputGroupClassName.value,
    props.white && "form-white",
    props.wrapperClass,
  ];
});
const inputClassName = computed(() => {
  return [
    "form-control",
    props.size
      ? `form-control-${props.size}`
      : props.inputGroup &&
        props.inputGroup !== true &&
        `form-control-${props.inputGroup}`,
    (inputValue.value || inputValue.value === 0) && "active",
    showPlaceholder.value && "placeholder-active",
    isInputValidated.value && isInputValid.value && "is-valid",
    isInputValidated.value && !isInputValid.value && "is-invalid",
    isSpecialInput.value && getSpecialInputOpacityClass(),
  ];
});

const getSpecialInputOpacityClass = () => {
  if (!isSpecialInput.value) return "";

  const shouldBeVisible =
    inputValue.value || inputValue.value === 0 || isFocused.value;
  return shouldBeVisible ? "opacity-1" : "opacity-0";
};

const labelClassName = computed(() => {
  return ["form-label", props.labelClass];
});

const inputGroupClassName = computed(() => {
  if (!props.inputGroup) {
    return;
  }
  return props.inputGroup !== true
    ? `input-group input-group-${props.inputGroup}`
    : "input-group";
});

const validationStyle = computed(() => {
  return props.inputGroup && isInputValidated.value
    ? { marginBottom: "1rem" }
    : "";
});

const validFeedbackClassName = computed(() => {
  return props.tooltipFeedback ? "valid-tooltip" : "valid-feedback";
});

const invalidFeedbackClassName = computed(() => {
  return props.tooltipFeedback ? "invalid-tooltip" : "invalid-feedback";
});

// Validation ------------------------
const isInputValidated = ref(props.isValidated);
const isInputValid = ref(props.isValid);
const defaultValidatorInvalidFeedback = ref("");
const customInvalidFeedback = computed(() => {
  if (isInputValidated.value && !isInputValid.value && props.validationEvent) {
    return defaultValidatorInvalidFeedback.value;
  }
  return props.invalidFeedback;
});

const handleValidation = (e: Event) => {
  const target = e.target as HTMLInputElement;
  isInputValid.value = target.checkValidity();
  if (!isInputValid.value) {
    defaultValidatorInvalidFeedback.value = target.validationMessage;
  }
  isInputValidated.value = true;
  emit("on-validate", isInputValid.value);
};

const bindValidationEvents = () => {
  if (props.validationEvent === "submit") {
    return;
  }

  inputRef.value &&
    props.validationEvent &&
    on(inputRef.value, props.validationEvent, handleValidation);
};

function calcNotch() {
  if (labelRef.value) {
    notchMiddleWidth.value = labelRef.value.clientWidth * 0.8 + 8;
  }
}

const shouldRecalcNotch = computed(() => {
  // notchMiddle.width is 8px when the label width equal 0 - value 8 is beeing added to the notchMiddleWidth in the calcNotch method
  return (
    props.label &&
    labelRef.value &&
    notchMiddleWidth.value === 8 &&
    labelRef.value.textContent !== ""
  );
});

const isSpecialInput = computed(() => {
  const inputsWithPlaceholder = [
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
  ];
  return inputsWithPlaceholder.includes(attrs.type as string);
});

function setPlaceholder() {
  if (attrs.placeholder && !labelRef.value) {
    showPlaceholder.value = true;
  } else {
    showPlaceholder.value = false;
  }
}

const currentLength = ref<number | null>(null);

currentLength.value =
  typeof inputValue.value === "string" && inputValue.value
    ? inputValue.value.length
    : 0;

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (
    props.maxlength &&
    target.value.length > props.maxlength &&
    typeof inputValue.value === "string"
  ) {
    target.value = inputValue.value;
    return;
  }

  currentLength.value = target.value.length;
  inputValue.value = target.value;
  emit("update:modelValue", inputValue.value);
}

function handleFocus() {
  checkDateType(true);
  isFocused.value = true;

  if (props.label && shouldRecalcNotch.value) {
    calcNotch();
  }
}

function handleBlur() {
  checkDateType();
  isFocused.value = false;
}

function clickOutside() {
  emit("click-outside");
}

const notchRef = ref<HTMLElement | null>(null);
const inputNotchElements = ref<NodeListOf<HTMLInputElement> | null>(null);

const handleMultipleNotchesVisibility = (isFocused: boolean) => {
  inputNotchElements.value &&
    inputNotchElements.value.forEach(
      (notch) => (notch.style.opacity = isFocused ? "0" : "1")
    );
  if (isFocused && notchRef.value) {
    notchRef.value.style.opacity = "1";
  }
};

const isTypeDate = attrs.type && attrs.type === "date";
const checkDateType = (isFocused = false) => {
  if (
    props.label &&
    props.formOutline &&
    inputNotchElements.value &&
    inputNotchElements.value?.length > 1
  ) {
    handleMultipleNotchesVisibility(isFocused);
  }

  if (!isTypeDate) {
    return;
  }

  if (inputRef.value) {
    inputRef.value.type = isFocused ? "date" : "text";
  }
};

const isFirstChild = (element: HTMLElement) => {
  return !Boolean(
    [...(element.parentNode as HTMLElement).children].findIndex(
      (item) => item === element
    )
  );
};

onMounted(() => {
  calcNotch();
  setPlaceholder();
  checkDateType();

  if (props.label && props.formOutline && inputRef.value) {
    inputNotchElements.value =
      inputRef.value.parentNode?.querySelectorAll(".form-notch") || null;
  }

  if (
    props.label &&
    props.formOutline &&
    labelRef.value &&
    inputRef.value &&
    !isFirstChild(inputRef.value)
  ) {
    const labelLeft = parseFloat(getComputedStyle(labelRef.value).left);
    labelRef.value.style.left = `${labelLeft + inputRef.value.offsetLeft}px`;
    notchLeadingWidth.value += inputRef.value.offsetLeft;
  }

  if (props.validationEvent) {
    bindValidationEvents();
  }
});

onUpdated(() => {
  calcNotch();
  setPlaceholder();
});

onUnmounted(() => {
  inputRef.value &&
    props.validationEvent &&
    off(inputRef.value, props.validationEvent, handleValidation);
});

watchEffect(() => {
  if (typeof props.modelValue === "string") {
    if (props.maxlength && props.modelValue?.length > props.maxlength) {
      inputValue.value = props.modelValue.slice(0, props.maxlength);
      currentLength.value = props.maxlength;
      return;
    }

    currentLength.value = props.modelValue?.length || 0;
  }

  inputValue.value = props.modelValue;
});

watch(
  () => props.isValidated,
  (value) => (isInputValidated.value = value)
);

watch(
  () => props.isValid,
  (value) => (isInputValid.value = value)
);

defineExpose({
  inputRef,
});
</script>

<script lang="ts">
export default {
  name: "MDBInput",
  inheritAttrs: false,
};
</script>
