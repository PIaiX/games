import React, {useEffect, useState} from 'react'
import InputFile from '../../components/utils/InputFile'
import ChatBox from '../../components/ChatBox'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link, useParams} from 'react-router-dom'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiTrash} from 'react-icons/bi'
import {FiChevronLeft, FiSend} from 'react-icons/fi'
import {createTicketMessage, getAllTicketMessages} from '../../services/tickets'
import InfiniteScroll from 'react-infinite-scroller'
import groupBy from '../../helpers/groupBy'
import {useForm} from 'react-hook-form'
import {apiValidationRules} from '../../config/api'
import ValidateWrapper from '../../components/UI/ValidateWrapper'
import Loader from '../../components/UI/Loader'
import {useSelector} from 'react-redux'
import {dispatchAlert} from '../../helpers/alert'

const Ticket = () => {
    const {id} = useParams()
    const [messages, setMessages] = useState({
        isLoaded: false,
        items: [],
        meta: {},
    })
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [currentPage, setCurrentPage] = useState(1)
    const [isFileSent, setIsFileSent] = useState(false)

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset,
        resetField,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            userId: userId ?? '',
            ticketId: id ?? '',
            text: '',
            media: '',
        },
    })

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        if (isFileSent) {
            setIsFileSent(!isFileSent)
        }
    }, [isFileSent])

    const createMessage = (data) => {
        const formData = new FormData()

        for (const key in data) {
            if (key !== 'media') {
                formData.append(key, data[key])
            }
        }

        Object.values(data?.media).forEach((i) => formData.append('medias[]', i))

        createTicketMessage(formData)
            .then((res) => {
                setMessages((prevState) => ({
                    ...prevState,
                    items: prevState.items ? [...prevState.items, res] : [res],
                }))
                reset()
                setIsFileSent(true)
            })
            .catch(() => {
                dispatchAlert('danger', '?????????????????? ????????????, ?????????????????? ???? ????????????????????')
            })
    }

    const getMessages = () => {
        if (id) {
            getAllTicketMessages(id, {page: currentPage, limit: 4, orderBy: 'desc'})
                .then((res) => {
                    res &&
                        setMessages({
                            isLoaded: true,
                            items: [...res.data.reverse(), ...messages.items],
                            meta: res?.meta,
                        })
                    setCurrentPage((prevState) => prevState + 1)
                })
                .catch(() => {
                    setMessages({isLoaded: true, items: null})
                })
        }
    }

    return (
        <div className="main p-0">
            <div className="message-window">
                <div className="top">
                    <Link to="/account/help">
                        <FiChevronLeft className="fs-13" />
                        <span className="d-none d-sm-inline ms-2">??????????</span>
                    </Link>
                    <div className="text-center">
                        <h4 className="color-1 mb-0 mb-sm-2">???????????? ??????????????????</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="img me-2 me-sm-4">
                            <img src="/images/user2.png" alt="?????????????????? ??????????" />
                        </div>
                        {/*<Dropdown align="end">
                            <Dropdown.Toggle variant="simple">
                                <IoEllipsisHorizontal className="fs-15" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button">
                                    <BiTrash className="fs-13" />
                                    <span className="ms-2">?????????????? ??????????</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>*/}
                    </div>
                </div>
                <div>
                    <div className="middle">
                        <InfiniteScroll
                            loadMore={getMessages}
                            isReverse={true}
                            loader={
                                <div key={99999} className="d-flex justify-content-center">
                                    <Loader />
                                </div>
                            }
                            hasMore={
                                messages?.items && messages?.meta
                                    ? messages.meta.total > messages.items.length
                                    : true
                            }
                            threshold={20}
                            useWindow={false}
                        >
                            {messages.items &&
                                Object.entries(groupBy(messages.items, 'createdAt', true))?.map((i, index) => (
                                    <ChatBox key={i[0]} keyArr={i[0]} arr={i[1]} />
                                ))}
                        </InfiniteScroll>
                    </div>
                    <form onSubmit={handleSubmit(createMessage)}>
                        <InputFile multiple={true} register={register('media')} isFileSent={isFileSent} />
                        <ValidateWrapper error={errors?.text}>
                            <input
                                type="text"
                                placeholder="?????????????? ??????????????????"
                                {...register('text', {
                                    required: apiValidationRules.required,
                                    minLength: {value: 0, message: '?????????????? 1 ????????????!'},
                                })}
                            />
                        </ValidateWrapper>
                        <button type="submit">
                            <FiSend />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ticket
