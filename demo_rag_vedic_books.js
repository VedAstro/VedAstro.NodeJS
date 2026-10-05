/**
 * DEMO: Semantic Search of Classical Texts (RAG)
 * USE CASE: Ask a plain-English question, get the most relevant passages from
 *           classical Vedic books — no exact keywords required
 * DIFFICULTY: Intermediate
 *
 * The returned passages are designed to be dropped into an LLM prompt, which
 * is how you build a *cited* astrology chatbot.
 *
 * RUN:
 *   node demo_rag_vedic_books.js
 */
import { Calculate } from 'vedastro';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
  Calculate.SetAPIKey('FreeAPIUser');

  // Which classical texts are searchable?
  const texts = await Calculate.GetAvailableSourceTexts();
  console.log(`Searchable texts (${texts.length}):`);
  for (const t of texts) console.log(`  - ${t}`);
  console.log('');

  await sleep(12_500);

  // Natural-language semantic search across all texts
  const passages = await Calculate.SearchSourceText('effects of Saturn in the 7th house');
  for (const p of passages) {
    // lower score = closer match, so invert it into a relevance percentage
    const relevance = (1 - (p.score ?? 1)) * 100;
    console.log(`${p.sourceName} p.${p.pageNumber} (${relevance.toFixed(0)}%)`);
    console.log(`   ${p.text}\n`);
  }

  await sleep(12_500);

  // Narrow to one book and tune the knobs.
  // Signature is POSITIONAL: (query, topK, sourceName, contextSize)
  const focused = await Calculate.SearchSourceText(
    'results of Jupiter aspecting the Moon',
    3,
    'Hindu-Predictive-Astrology',
    800
  );

  console.log(`Focused search returned ${focused.length} passage(s).`);

  // BUILDING A CITED CHATBOT
  // 1. await Calculate.SearchSourceText(userQuestion)
  // 2. Format each hit as a numbered source with its book + page
  // 3. Ask your LLM to answer using ONLY those passages, citing [1], [2], ...
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
