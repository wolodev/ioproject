<template>
  <q-page padding class="column items-center">
    <h4>Hello! Let's us help you find the best products for yourself!</h4>
      <q-splitter
        v-model="splitterModel"
        style="height: 180px; width: 80%;"
      >

        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal"
          >
            <q-tab name="care"  label="Care Type" />
            <q-tab name="question-1"  label="Question 2" />
            <q-tab name="question-2"  label="Question 3" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="care">
              <div class="text-h4 q-mb-md mw-80">What are you interested in:</div>
             <!-- <q-btn-group> -->
               <q-btn label="Skin care" @click="skin"/>
               <q-btn label="Hair care" @click="hair"/>
             <!-- </q-btn-group> -->
            </q-tab-panel>

            <q-tab-panel name="question-1">
              <div class="text-h4 q-mb-md">{{questions[0].question}}</div>
                <q-select 
                  v-model="answers.question1" 
                  :options="questions[0].options"
                  :label="questions[0].placeholder" 
                  option-value="value"
                  option-label="label"
                  :emit-value="true"
                  :map-options="true"
                />
            </q-tab-panel>

            <q-tab-panel name="question-2">
              <div class="text-h4 q-mb-md">{{questions[1].question}}</div>
              <q-select 
                v-model="answers.question2" 
                :options="questions[1].options"
                :label="questions[1].placeholder" 
                option-value="value"
                option-label="label"
                :emit-value="true"
                :map-options="true"
              />
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
      <div v-if="products.length">
        <p>Recommended products</p>
        <ProductsGrid :products = "products"/>
      </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, watch } from 'vue';
import useProducts from 'src/composables/useProducts';
import ProductsGrid from 'src/components/Products/ProductsGrid.vue';
const { query } = useProducts();
const products: Ref<Product[]> = ref([])
const answers = reactive({
  question1: '',
  question2: ''
})
const type: Ref<careType> = ref('skin')

const hairQuestions: question[] = [
  {
    question: 'What’s your hair type?',
    placeholder: 'Hair type',
    options: [
      {
        label: 'Straight',
        value: 'straight'
      },
      {
        label: 'Wavy',
        value: 'wavy'
      },
      {
        label: 'Curly',
        value: 'curly'
      },
      {
        label: 'Coily',
        value: 'coily'
      }
    ]
  },
  {
    question: 'What’s your hair texture?',
    placeholder: 'Hair texture',
    options: [
      {
        label: 'Fine',
        value: 'fine'
      },
      {
        label: 'Medium',
        value: 'medium'
      },
      {
        label: 'Thick',
        value: 'thick'
      },
    ]
  }]


const skinQuestions: question[] = [
    {
    question: 'What’s your skin type?',
    placeholder: 'Skin type',
    options: [
      {
        label: 'Oily',
        value: 'oily'
      },
      {
        label: 'Dry',
        value: 'dry'
      },
      {
        label: 'Normal',
        value: 'normal'
      },
    ]
  },
  {
    question: 'What’s your skin texture?',
    placeholder: 'Skin texture',
    options: [
      {
        label: 'Fine',
        value: 'fine'
      },
      {
        label: 'Medium',
        value: 'medium'
      },
      {
        label: 'Thick',
        value: 'thick'
      },
    ]
  }]

interface question {
  question: string
  placeholder: string
  options: {
    label: string,
    value: string,
  }[]
}

const questions: Ref<question[]> = ref(skinQuestions);
const tab = ref('care');
const splitterModel = ref(20)

function resetAnswers() {
  answers.question1 = '';
  answers.question2 = '';
}

function skin() {
  resetAnswers()
  tab.value = 'question-1'
  questions.value = skinQuestions;
}

function hair() {
  resetAnswers()
  tab.value = 'question-1'
  questions.value = hairQuestions;
}



watch(answers, async (answer) => {
  if(answer.question1 && answer.question2) {
    products.value = await query({
      type: type.value
    })
  } else {
    products.value = [];
  }
}, {
  deep: true,
})
</script>

<style lang="scss" scoped>
.mw-80 {
  min-width: 100%;
}
</style>