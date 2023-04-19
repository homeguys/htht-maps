import { defineComponent, Ref, ref } from 'vue';
import { createUseStyles } from 'vue-jss';
import MonacoEditor from '../components/MonacoEditor';

function toJson(data: any) {
  return JSON.stringify(data, null, 2); // 第三个参数含义
}

const schema = {
  type: 'string',
};

const useStyles = createUseStyles({
  // 写样式
  editor: {
    minHeight: 400,
  },
});

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema);
    const handleCodeChange = (code: string) => {
      let schema: any;

      try {
        schema = JSON.parse(code);
      } catch (error) {
        console.warn('error');
      }

      schemaRef.value = schema;
    };
    const classesRef = useStyles();

    return () => {
      const classes = classesRef.value;
      const code = toJson(schemaRef.value);

      return <MonacoEditor code={code} onChange={handleCodeChange} title='schema' class={classes.editor} />;
    };
  },
});
