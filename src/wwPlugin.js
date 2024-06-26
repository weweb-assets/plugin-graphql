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
                const { url, query, variables, headers, resultKey, isWithCredentials, isFullResponse } = collection.config;
                const data = await this._graphqlRequest(url, query, variables, headers, isWithCredentials, isFullResponse);
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
    async graphqlRequest({ url, query, variables, headers, isWithCredentials, isFullResponse }, wwUtils) {
        wwUtils?.log('info', `[GraphQL] Executing request`, {
            type: 'request',
            preview: { Variables: computeList(variables), Headers: computeList(headers) },
        });
        return this._graphqlRequest(url, query, variables, headers, isWithCredentials, isFullResponse);
    },
    async _graphqlRequest(url, query, variables, headers, isWithCredentials, isFullResponse) {
        const { data } = await axios.post(
            url,
            { query, variables: computeList(variables) },
            { headers: computeList(headers), withCredentials: isWithCredentials }
        );
       
        return isFullResponse ? data : data.data;
    },
};

function computeList(list) {
    return (list || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
}
