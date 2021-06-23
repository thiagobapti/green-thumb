import {setup as dropdownSetup} from './dropdown';
import {setup as dataServiceSetup} from './data-service';
import {setup as loadingSetup} from './loading';

window.addEventListener('DOMContentLoaded', () => {
  dropdownSetup();
  dataServiceSetup();
  loadingSetup();
});