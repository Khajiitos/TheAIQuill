import SuggestionForm from "@/components/suggestion_form";
import SuggestionPersonalityForm from "@/components/suggestion_personality_form";
import { query } from "@/lib/db";
import Link from "next/link";
import styles from "./page.module.css";

export default async function SuggestPage() {
    const personalities: Array<{ personality: string }> = (await query(
        "SELECT personality FROM personality",
        []
    )) as Array<{ personality: string }>;

    return (
        <main className={styles.main}>
            <h1>Suggest an article</h1>
            <p>
                Here you will be able to suggest an article idea or AI&apos;s
                &quot;personality&quot; for the next article that gets
                generated.
            </p>
            <p>
                <b>You can only suggest one idea.</b> After an article gets
                generated, you can do that again.
            </p>
            <p>
                When an article gets generated, one random suggested idea gets
                selected, rest are cleared.
            </p>
            <p>
                You can view what ideas are suggested for the next article{" "}
                <Link href="/suggestions">here</Link>.
            </p>

            <SuggestionForm></SuggestionForm>

            <SuggestionPersonalityForm
                options={personalities.map(
                    (personalityObj) => personalityObj.personality
                )}
            ></SuggestionPersonalityForm>
        </main>
    );
}
