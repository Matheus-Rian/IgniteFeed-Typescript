import { FormEvent, useState } from 'react';
import { PostComment } from './PostComment';

import Styles from './PostFooter.module.css';

interface PostFooterProps {
    CommentsContent: {
        Id: number;
        UserName: string;
        ProfilePic: string;
        IsTheCurrentUser: boolean;
        PublishTime: number;
        Content: string;
        LikesAmount: number;
    }[] | null;
}

export function PostFooter({ CommentsContent }: PostFooterProps) {
    const [IsCreatingComment, setIsCreatingComment] = useState(false);
    const [CurrentComments, setCurrentComments] = useState<PostFooterProps["CommentsContent"] | null>(CommentsContent);
    const [TextareaValue, setTextareaValue] = useState('');

    let DoCommentsExist = CurrentComments?.length as number > 0;

    function HandleCreateNewComment(event: FormEvent<HTMLFormElement>){
        event.preventDefault();


        if(event.nativeEvent.submitter.name === "Cancel") {
            setIsCreatingComment(!IsCreatingComment);
            setTextareaValue('');
        
        } else if(event.nativeEvent.submitter.name === "Publish") {
            setCurrentComments([...CurrentComments, {
                UserName: 'Juan Garcia',
                ProfilePic: 'https://avatars.githubusercontent.com/u/61752887?v=4',
                IsTheCurrentUser: true,
                PublishTime: 0,
                Content: TextareaValue,
                LikesAmount: 0,
                Id: CurrentComments?.length as number + 1,
            }]);

            setTextareaValue('');
        }
    }

    function DeleteComment(CommentId: number){
        setCurrentComments(CurrentComments ? CurrentComments.filter(element => element?.Id !== CommentId) : null);
    }


    return(
        <footer className={Styles.Footer}>
            <form
             onSubmit={HandleCreateNewComment}
            >
                <h2>Deixe seu feedback</h2>
                
                <textarea
                 name='Textarea'
                 placeholder='Escreva um comentário...'
                 value={TextareaValue}
                 onChange={(event) => {setTextareaValue(event.target.value)}}
                 onFocus={ () => !IsCreatingComment ? setIsCreatingComment(!IsCreatingComment) : null}
                >

                </textarea>

                {
                    IsCreatingComment
                    ? 
                        <div className={Styles.Buttons}>
                            <button
                             name='Publish'
                             className={Styles.PublishBtn}
                             disabled={TextareaValue.length <= 0 }
                            >
                                Publicar
                            </button>
                            <button
                             name='Cancel'
                             className={Styles.CancelBtn}
                            >
                                Cancelar
                            </button>
                        </div>
                    : null
                }
                
            </form>

            {
                DoCommentsExist
                ? CurrentComments!.map((element) => {
                    return (<PostComment
                     key={element?.Id}
                     CommentsContent={element!}
                     DeleteComment={DeleteComment}
                    />)
                })
                : null
            }

        </footer>
    )
}