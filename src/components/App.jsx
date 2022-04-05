import styles from "./App.module.scss";
import {Form} from "./Form/Form";
import React from "react";
import {mockRequests} from "../utils/mockRequests";
import {STATIC_TEXTS} from "../resources/staticTexts";
import {REPO_URL} from "../utils/api";

function App() {
    mockRequests();
    return (
        <div className={styles.app}>
            <main className="container d-flex align-items-center flex-column">
                <Form/>
                <div className={"col-6 mt-2 d-flex justify-content-end"}>
                    <a href={REPO_URL} rel="noreferrer" target={"_blank"}>{STATIC_TEXTS.DOCS}</a>
                </div>
            </main>
        </div>
    );
}

export default App;
