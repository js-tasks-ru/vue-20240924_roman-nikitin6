import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const searchText = ref('');
    const emailsArray = computed(() => {
      let isInclude = (str, search) => search && str.toLowerCase().includes(search.toLowerCase());
      let result = [];
      emails.forEach((el) => {
        result.push({email: el, marked: isInclude(el, searchText.value)});
      });
      return result;
    });
    return {
      searchText,
      emailsArray
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input type="search" aria-label="Search" v-model="searchText"/>
      </div>
      <ul v-for="value in emailsArray" aria-label="Emails">
        <li :class="{'marked':value.marked}">
          {{ value.email }}
        </li>
      </ul>
    </div>
  `,
})
