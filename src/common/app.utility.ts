export function proxy(obj: any) {
    const handler = {
        get(target: any, propKey: string, receiver: any) {
            const origMethod = target[propKey];
            return function (...args: any) {
                return origMethod.apply(obj, args);
            };
        }
    }
    const proxyObj = new Proxy(obj, handler);
    return proxyObj
}