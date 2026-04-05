from langchain_core import output_parsers
from langchain_core.output_parsers import JsonOutputParser
from schemas.blog_schema import Blog_output

def get_output_parser():
    output_parsers = JsonOutputParser(pydantic_object=Blog_output)
    return output_parsers


def get_format_instructions():
    parser = JsonOutputParser(pydantic_object=Blog_output)
    return parser.get_format_instructions()



def format_output(response):

    full_text = (
        response['title'] + " " +
        response['introduction'] + " " +
        response['body'] + " " +
        response['conclusion']
    )
    real_word_count = len(full_text.split())
    print("\n" + "=" * 50)
    print("\n Blog Tittle : ",response['title'])
    print("\n Introduction : " , response['introduction'])
    print("\n Body : ",response['body'])
    print("\n Conclusion : ",response['conclusion'])
    print("\n Tags : ",response['tags'])
    print("\n Meta Description : ",response['meta_description'])
    print("\n Word Count : ",real_word_count)
    print("\n" + "=" * 50)