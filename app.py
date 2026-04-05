from flask import Flask, render_template, request, jsonify
from Model.llm_loader import get_llm
from prompts.prompt_template import prompt_template
from parsers.output_parser import get_output_parser, get_format_instructions

app = Flask(__name__)


def run_blog_chain(topic, audience, word_count, language):
    """Run the blog generation chain with given parameters."""
    llm = get_llm()
    output_parser = get_output_parser()

    chain = prompt_template | llm | output_parser

    response = chain.invoke({
        "topic": topic,
        "audience": audience,
        "word_count": word_count,
        "language": language,
        "format_instructions": get_format_instructions()
    })

    return response


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    topic = request.form.get("topic", "").strip()
    audience = request.form.get("audience", "").strip()
    word_count = request.form.get("word_count", "500").strip()
    language = request.form.get("language", "English").strip()

    if not topic or not audience:
        return render_template("index.html", error="Please fill in all required fields.")

    try:
        result = run_blog_chain(topic, audience, word_count, language)
        return render_template("result.html", blog=result, topic=topic)
    except Exception as e:
        return render_template("index.html", error=f"Generation failed: {str(e)}")


if __name__ == "__main__":
    app.run(debug=True)
