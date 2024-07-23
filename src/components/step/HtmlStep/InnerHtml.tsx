import React from "react";
import { useEffect, useRef } from "react";

/**
 * Helper method to get a promise which resolves once dom manipulation has concluded.
 * @param divElement A reference to a div element where the dom will be manipulated
 * @returns A promise which resolves once the dom has been manipulated, and all external scripts have either loaded or errored.
 */
function getMutationDetectedPromise(divElement: HTMLDivElement) {
    return new Promise<void>((resolve, reject) => {
        if (!divElement) {
            reject("No divElement set");
            return;
        }
        const observer = new MutationObserver((mutations, observer) => {
            //Only run each observer once
            observer.disconnect();

            let newExternalScripts: HTMLScriptElement[] = [];
            for (const mutation of mutations) {
                if (mutation.type !== "childList") continue;

                for (const node of mutation.addedNodes) {
                    if (!(node instanceof HTMLScriptElement)) continue;
                    if (!node.src) continue;

                    newExternalScripts.push(node);

                    node.onload = () => {
                        newExternalScripts = newExternalScripts.filter((el) => el !== node);
                        if (newExternalScripts.length === 0) {
                            resolve();
                        }
                    };
                    node.onerror = (err) => {
                        console.error(err);
                        newExternalScripts = newExternalScripts.filter((el) => el !== node);
                        if (newExternalScripts.length === 0) {
                            resolve();
                        }
                    };
                }
            }

            if (newExternalScripts.length === 0) {
                resolve();
            }
        });

        observer.observe(divElement, { childList: true });
    });
}

export function InnerHTML(props: { html: string }) {
    const { html } = props;
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function asyncEffect() {
            if (!divRef.current) return;

            const documentFragment = document.createRange().createContextualFragment(html);

            //Clear existing children
            divRef.current.replaceChildren();

            //The appendChild operation modifies the source array, so iterate over a shallow copy.
            for (const child of [...documentFragment.children]) {
                //Append elements one at a time, ensuring the current element is fully loaded
                //before proceeding to the next one.
                //The purpose of this is to allow external scripts to load and execute before
                //the next element is appended.
                //This is done by waiting for a mutation observer to fire as we modify the DOM.
                const mutationDetected = getMutationDetectedPromise(divRef.current);
                divRef.current.appendChild(child);
                await mutationDetected;
            }
        }

        asyncEffect();
    }, [divRef, html]);

    return <div className="mdhui-html-step" ref={divRef}></div>;
}
