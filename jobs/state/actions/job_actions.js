import axios from 'axios';
import qs from 'qs';
import { Location } from 'expo';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL =
  'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '1303284387458115',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10
};

const buildJobsUrl = (zip, jobtitle) => {
  const job = jobtitle.join(' ')
  const query = qs.stringify({
    ...JOB_QUERY_PARAMS,
    l: zip,
    q: job
  });
  console.log(job)
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (
  region,
  jobtitle,
  callback
) => async dispatch => {
  try {
    let zipObj = await Location.reverseGeocodeAsync(
      region
    );
    let zip = zipObj[0].postalCode;
    const url = buildJobsUrl(zip, jobtitle);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = job => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
