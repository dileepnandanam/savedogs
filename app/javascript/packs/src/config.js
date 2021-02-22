import axios from 'axios'

export const fetchConfig = () => {
  axios.get('/api/app_configs')
    .then((res) => {
      localStorage.setItem('config', JSON.stringify(res.data))
    })
}
export const getConfig = (key) => (
  JSON.parse(localStorage.getItem('config'))[key]
)
