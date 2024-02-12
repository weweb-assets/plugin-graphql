/* wwEditor:start */
import './components/CollectionEdit.vue';
import './components/CollectionSummary.vue';
import './components/GraphqlRequest.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Collection API
    \================================================================================================*/
    async fetchCollection(collection) {
        if (collection.mode === 'dynamic') {
            try {
                const { url, query, variables, headers, resultKey, isWithCredentials, throwOnError } = collection.config;
                const data = await this._graphqlRequest(url, query, variables, headers, isWithCredentials, throwOnError);
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
    async graphqlRequest({ url, query, variables, headers, isWithCredentials, throwOnError }, wwUtils) {
        wwUtils?.log('info', `[GraphQL] Executing request`, {
            type: 'request',
            preview: { Variables: computeList(variables), Headers: computeList(headers) },
        });
        return this._graphqlRequest(url, query, variables, headers, isWithCredentials, throwOnError);
    },
    async _graphqlRequest(url, query, variables, headers, isWithCredentials, throwOnError) {
        const { data } = await axios.post(
            url,
            { query, variables: computeList(variables) },
            { headers: computeList(headers), withCredentials: isWithCredentials }
        );
        if (throwOnError && data.errors?.length) {
            const error = new Error('GraphQL request failed');
            error.errors = data.errors;
            throw error;
        }
        return data.data;
    },
};

function computeList(list) {
    return (list || []).reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
}
