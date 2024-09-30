import os
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

def summarize_text(text, sentences_count=3, language="english"):
    parser = PlaintextParser.from_string(text, Tokenizer(language))
    stemmer = Stemmer(language)
    summarizer = LsaSummarizer(stemmer)
    summarizer.stop_words = get_stop_words(language)

    summary = summarizer(parser.document, sentences_count)
    return " ".join([str(sentence) for sentence in summary])

def generate_html(summaries):
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Text Summaries</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #333; }
            .summary { background-color: #f4f4f4; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Text Summaries</h1>
    """

    for i, summary in enumerate(summaries, 1):
        html_content += f"""
        <div class="summary">
            <h2>Summary {i}</h2>
            <p>{summary}</p>
        </div>
        """

    html_content += """
    </body>
    </html>
    """

    with open("summaries.html", "w", encoding="utf-8") as f:
        f.write(html_content)

if __name__ == "__main__":
    # Example texts to summarize
    texts = [
        "Your first long text here...",
        "Your second long text here...",
        # Add more texts as needed
    ]

    summaries = [summarize_text(text) for text in texts]
    generate_html(summaries)
    print("Summaries generated and HTML file created.")
