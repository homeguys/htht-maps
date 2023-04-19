import { defineComponent } from 'vue';
import NavBar from '../components/NavBar/index.vue';

export default defineComponent({
  setup() {
    return () => {
      return <NavBar />;
    };
  },
});
