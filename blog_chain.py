from parsers.output_parser import  get_output_parser , format_output, get_format_instructions
from Model.llm_loader import get_llm
from prompts.prompt_template import prompt_template

def run_blog_chain(topic , audience,word_count,language):
    print("\n Generating the blog for your topic ")
    
    llm = get_llm()
    output_parsers = get_output_parser()


    chain = prompt_template|llm|output_parsers
    response = chain.invoke({
        "topic" : topic,
        "audience": audience,
        "word_count": word_count,
        "language": language,
        "format_instructions": get_format_instructions()
    })

    format_output(response)

if __name__ == "__main__":
    run_blog_chain()