import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('time', (value, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(pattern);
});
