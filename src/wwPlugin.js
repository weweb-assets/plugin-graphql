/* wwEditor:start */
import './components/CollectionEdit.vue';
import './components/CollectionSummary.vue';
import './components/GraphqlRequest.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Collection API
    \================================================================================================*/
    async _fetchCollection(collection) {
        if (collection.mode === 'dynamic') {
            try {
                const { url, query, variables, headers, resultKey, isWithCredentials } = collection.config;
                const data = await this._graphqlRequest(url, query, variables, headers, isWithCredentials);
                return { data: _.get(data, resultKey, data), error: null };
            } catch (err) {
                return {
                    error: Object.getOwnPropertyNames(err).reduce((obj, key) => ({ ...obj, [key]: err[key] }), {}),
                };
            }
        } else {
            return { data: null, error: null };
        }
    },
    async graphqlRequest({ url, query, variables, headers, isWithCredentials }, wwUtils) {
        /* wwEditor:start */
        if (wwUtils) {
            wwUtils.log({
                label: 'Payload',
                preview: { Variables: computeList(variables), Headers: computeList(headers) },
            });
        }
        /* wwEditor:end */
        return this._graphqlRequest(url, query, variables, headers, isWithCredentials);
    },
    async _graphqlRequest(url, query, variables, headers, isWithCredentials) {
        const { data } = await axios.post(
            url,
            { query, variables: computeList(variables) },
            { headers: computeList(headers), withCredentials: isWithCredentials }
        );
        return data.data;
    },
};

function computeList(list) {
    return (list || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
}
