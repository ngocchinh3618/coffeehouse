<template>
  <div class="product__title df fic my14x fcc">
    <b-icon :name="dataShareTitle.icon" class="c-yellow-3" :size="32" />
    <h1 class="mx-4x">
      {{ dataShareTitle.title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'SharedTitle',
  props: {
    dataShareTitle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
