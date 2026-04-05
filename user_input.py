from pydantic import BaseModel,Field

class Blog_User_Input(BaseModel):
    topic:str=Field(description="The Topic of the blog on which user wants to search")
    audience:str=Field(description = "The Audience who will read this blog ")
    word_count:int=Field(description = "The Maximum words in which the blog be generated")
    language:str=Field(description="The Language in which the blog will be generated ")



def get_user_input():
    print("""
      Welcome to BlogCraft AI
         Intelligent Content Generation, Powered by LangChain
    """)
    topic = input("\n Enter the topic of Blog you want a blog")
    audience = input("\n Enter the target audience of your blog")
    word_count = input("\n Enter the max words of your blog")
    language = input("\n Enter the language in which you want the blog to be generated")

    return topic , audience,word_count,language

    