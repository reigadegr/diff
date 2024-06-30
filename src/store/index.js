import { createPinia } from "pinia";
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { storeKeyPrefix } from "../settings";
const pinia = createPinia();
pinia.use(createPersistedState({ key: id => `${storeKeyPrefix}${id}`, storage: localStorage }));

export { pinia };
