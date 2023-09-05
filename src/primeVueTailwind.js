import { usePassThrough } from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";

const CustomTailwind = usePassThrough(
    Tailwind,
    {
        datatable: {
            wrapper: {
                class: ['rounded-md']
            }
        }
    },
    {
        mergeSections: true,
        mergeProps: false
    }
);

export default CustomTailwind;
