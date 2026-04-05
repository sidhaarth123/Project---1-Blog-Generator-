from pydantic import BaseModel,Field
from typing import List

class Blog_output(BaseModel):
    title:str=Field(description = "The Tittle of the blog")
    introduction:str=Field(description = "The Introduction of the blog")
    body:str=Field(description="The Body of the blog")
    conclusion:str=Field(description="The Conclusion of the blog")
    tags:List[str]=Field(description="The tags of the blog")
    meta_description:str=Field(description="The meta description of the blog")
    word_count:int=Field(description="The word count of the blog")