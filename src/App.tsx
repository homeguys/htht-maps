import { defineComponent } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  setup() {
    return () => {
      return <router-view />;
    };
  },
});
