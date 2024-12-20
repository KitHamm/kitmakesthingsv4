"use client";

import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { About, Images } from "@prisma/client";
import { AboutContentForm, LandingContentForm } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import {
    CircularProgress,
    Chip,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { LandingWithTech } from "@/lib/types";
import {
    updateAbout,
    updateLanding,
} from "@/components/actions/ContentActions";
import axios from "axios";

export default function ContentMain(props: {
    landingContent: LandingWithTech;
    aboutContent: About;
    images: Images[];
}) {
    // States
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [imageToUpload, setImageToUpload] = useState<File | null>(null);
    const [uploadTarget, setUploadTarget] = useState("");
    const [uploadForm, setUploadForm] = useState(
        props.images.length > 0 ? false : true
    );

    const [currentLandingImage, setCurrentLandingImage] = useState("");
    const [currentAbout1Image, setCurrentAbout1Image] = useState("");
    const [currentAbout2Image, setCurrentAbout2Image] = useState("");
    const [currentAbout3Image, setCurrentAbout3Image] = useState("");
    const [currentAbout4Image, setCurrentAbout4Image] = useState("");
    const landingFormTextArea = useRef<HTMLTextAreaElement | null>(null);
    const shortAboutTextArea = useRef<HTMLTextAreaElement | null>(null);
    const firstHighlightTextArea = useRef<HTMLTextAreaElement | null>(null);
    const secondHighlightTextArea = useRef<HTMLTextAreaElement | null>(null);
    const thirdHighlightTextArea = useRef<HTMLTextAreaElement | null>(null);
    const aboutFormTextArea = useRef<HTMLTextAreaElement | null>(null);
    const [landingTextAreaValue, setLandingTextAreaValue] = useState("");
    const [shotAboutTextAreaValue, setShortAboutTextAreaValue] = useState("");
    const [firstHighlightTextAreaValue, setFirstHighlightTextAreaValue] =
        useState("");
    const [secondHighlightTextAreaValue, setSecondHighlightTextAreaValue] =
        useState("");
    const [thirdHighlightTextAreaValue, setThirdHighlightTextAreaValue] =
        useState("");
    const [aboutTextAreaValue, setAboutTextAreaValue] = useState("");
    const [newTech, setNewTech] = useState("");

    // Modal Disclosure
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    // Forms
    const landingForm = useForm<LandingContentForm>();
    const {
        register: landingRegister,
        handleSubmit: landingHandleSubmit,
        reset: landingReset,
        formState: landingFormState,
        setValue: landingSetValue,
        control: landingControl,
    } = landingForm;
    const { errors: landingErrors } = landingFormState;
    const {
        fields: techFields,
        append: techAppend,
        remove: techRemove,
    } = useFieldArray({
        control: landingControl,
        name: "tech",
    });
    const aboutForm = useForm<AboutContentForm>();
    const {
        register: aboutRegister,
        handleSubmit: aboutHandleSubmit,
        reset: aboutReset,
        formState: aboutFormState,
        setValue: aboutSetValue,
    } = aboutForm;
    const { errors: aboutErrors } = aboutFormState;

    const { ref: landingRef, ...landingRest } = landingRegister("copy", {
        required: {
            value: true,
            message: "Copy is required.",
        },
        onChange: (e) => {
            setLandingTextAreaValue(e);
        },
    });
    const { ref: shortAboutRef, ...shortAboutRest } = landingRegister(
        "shortAbout",
        {
            required: {
                value: true,
                message: "Short is required.",
            },
            onChange: (e) => {
                setShortAboutTextAreaValue(e);
            },
        }
    );

    const { ref: firstHighlightTextRef, ...firstHighlightTextRest } =
        landingRegister("firstHighlightText", {
            required: {
                value: true,
                message: "Copy is required.",
            },
            onChange: (e) => {
                setFirstHighlightTextAreaValue(e);
            },
        });

    const { ref: secondHighlightTextRef, ...secondHighlightTextRest } =
        landingRegister("secondHighlightText", {
            required: {
                value: true,
                message: "Copy is required.",
            },
            onChange: (e) => {
                setSecondHighlightTextAreaValue(e);
            },
        });

    const { ref: thirdHighlightTextRef, ...thirdHighlightTextRest } =
        landingRegister("thirdHighlightText", {
            required: {
                value: true,
                message: "Copy is required.",
            },
            onChange: (e) => {
                setThirdHighlightTextAreaValue(e);
            },
        });

    const { ref: aboutRef, ...aboutRest } = aboutRegister("copy", {
        required: {
            value: true,
            message: "Copy is required.",
        },
        onChange: (e) => {
            setAboutTextAreaValue(e);
        },
    });

    // Use Effects

    useEffect(() => {
        if (landingFormTextArea.current !== null) {
            landingFormTextArea.current!.style.height = "inherit";

            landingFormTextArea.current!.style.height = `${Math.max(
                landingFormTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [landingTextAreaValue]);

    useEffect(() => {
        if (shortAboutTextArea.current !== null) {
            shortAboutTextArea.current!.style.height = "inherit";

            shortAboutTextArea.current!.style.height = `${Math.max(
                shortAboutTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [shotAboutTextAreaValue]);

    useEffect(() => {
        if (firstHighlightTextArea.current !== null) {
            firstHighlightTextArea.current!.style.height = "inherit";

            firstHighlightTextArea.current!.style.height = `${Math.max(
                firstHighlightTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [firstHighlightTextAreaValue]);

    useEffect(() => {
        if (secondHighlightTextArea.current !== null) {
            secondHighlightTextArea.current!.style.height = "inherit";

            secondHighlightTextArea.current!.style.height = `${Math.max(
                secondHighlightTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [secondHighlightTextAreaValue]);

    useEffect(() => {
        if (thirdHighlightTextArea.current !== null) {
            thirdHighlightTextArea.current!.style.height = "inherit";

            thirdHighlightTextArea.current!.style.height = `${Math.max(
                thirdHighlightTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [thirdHighlightTextAreaValue]);

    useEffect(() => {
        if (aboutFormTextArea.current !== null) {
            aboutFormTextArea.current!.style.height = "inherit";

            aboutFormTextArea.current!.style.height = `${Math.max(
                aboutFormTextArea.current!.scrollHeight,
                32
            )}px`;
        }
    }, [aboutTextAreaValue]);

    useEffect(() => {
        if (props.landingContent) {
            landingReset({
                title: props.landingContent.title,
                tech: props.landingContent.tech,
                copy: props.landingContent.copy,
                shortAbout: props.landingContent.shortAbout,
                imageUrl: props.landingContent.imageUrl,
                firstHighlightIcon: props.landingContent.firstHighlightIcon,
                firstHighlightHeader: props.landingContent.firstHighlightHeader,
                firstHighlightText: props.landingContent.firstHighlightText,
                secondHighlightIcon: props.landingContent.secondHighlightIcon,
                secondHighlightHeader:
                    props.landingContent.secondHighlightHeader,
                secondHighlightText: props.landingContent.secondHighlightText,
                thirdHighlightIcon: props.landingContent.thirdHighlightIcon,
                thirdHighlightHeader: props.landingContent.thirdHighlightHeader,
                thirdHighlightText: props.landingContent.thirdHighlightText,
            });
            setCurrentLandingImage(props.landingContent.imageUrl);
            setLandingTextAreaValue(props.landingContent.copy);
            setFirstHighlightTextAreaValue(
                props.landingContent.firstHighlightText
            );
            setSecondHighlightTextAreaValue(
                props.landingContent.secondHighlightText
            );
            setThirdHighlightTextAreaValue(
                props.landingContent.thirdHighlightText
            );
        }
        if (props.aboutContent) {
            aboutReset({
                title: props.aboutContent.title,
                copy: props.aboutContent.copy,
                image1Url: props.aboutContent.image1Url,
                image2Url: props.aboutContent.image2Url,
                image3Url: props.aboutContent.image3Url,
                image4Url: props.aboutContent.image4Url,
                text1: props.aboutContent.text1,
                text2: props.aboutContent.text2,
                title1: props.aboutContent.title1,
                title2: props.aboutContent.title2,
                title3: props.aboutContent.title3,
                title4: props.aboutContent.title4,
            });
            setCurrentAbout1Image(props.aboutContent.image1Url);
            setCurrentAbout2Image(props.aboutContent.image2Url);
            setCurrentAbout3Image(props.aboutContent.image3Url);
            setCurrentAbout4Image(props.aboutContent.image4Url);
            setAboutTextAreaValue(props.aboutContent.copy);
        }
    }, [aboutReset, landingReset, props.landingContent, props.aboutContent]);

    // Functions

    function OnSubmitLanding(data: LandingContentForm) {
        updateLanding(data).catch((err) => {
            console.log(err);
        });
    }

    function OnSubmitAbout(data: AboutContentForm) {
        updateAbout(data).catch((err) => {
            console.log(err);
        });
    }

    function dropHandler(ev: any) {
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (
                    item.kind === "file" &&
                    item.type.split("/")[0] === "image"
                ) {
                    const file = item.getAsFile();
                    setImageToUpload(file);
                }
            });
        }
    }

    async function uploadImage(file: File) {
        setUploading(true);
        setUploadProgress(0);
        if (file.type.split("/")[0] !== "image") {
            setUploading(false);
            return;
        } else {
            const formData = new FormData();
            formData.append("file", file);
            axios
                .post("/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (ProgressEvent) => {
                        if (ProgressEvent.bytes) {
                            let percent = Math.round(
                                (ProgressEvent.loaded / ProgressEvent.total!) *
                                    100
                            );
                            setUploadProgress(percent);
                        }
                    },
                })
                .then((res) => {
                    if (res.data.message) {
                        setUploading(false);
                        setImageToUpload(null);
                        onClose();
                        setUploadTarget("");
                        setUploadForm(false);
                        switch (uploadTarget) {
                            case "landing":
                                landingSetValue("imageUrl", res.data.message);
                                setCurrentLandingImage(res.data.message);
                                return;
                            case "about1":
                                aboutSetValue("image1Url", res.data.message);
                                setCurrentAbout1Image(res.data.message);
                                return;
                            case "about2":
                                aboutSetValue("image2Url", res.data.message);
                                setCurrentAbout2Image(res.data.message);
                                return;
                            case "about3":
                                aboutSetValue("image3Url", res.data.message);
                                setCurrentAbout3Image(res.data.message);
                                return;
                            case "about4":
                                aboutSetValue("image4Url", res.data.message);
                                setCurrentAbout4Image(res.data.message);
                                return;
                        }
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <>
            <div className="font-bold text-6xl mx-4 xl:mx-0 mb-6 pb-4 text-center xl:text-start border-b-2">
                Content.
            </div>
            <div className="flex flex-col xl:flex-row fade-in">
                <div className="xl:basis-1/2 bg-neutral-100 mx-4 p-4 rounded-lg">
                    <div className="font-bold text-4xl border-b-2 pb-2">
                        Landing
                    </div>
                    <form
                        className="mt-10"
                        onSubmit={landingHandleSubmit(OnSubmitLanding)}>
                        <div className="flex">
                            {props.landingContent ? (
                                <div className="relative mx-auto mb-8 w-1/2">
                                    {currentLandingImage !== "" ? (
                                        <>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    currentLandingImage
                                                }
                                                height={500}
                                                width={500}
                                                alt="Landing Image"
                                                className="w-full h-auto"
                                            />
                                            <div
                                                onClick={() => {
                                                    setUploadTarget("landing");
                                                    onOpen();
                                                }}
                                                className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                                <div className="my-auto font-bold text-white text-4xl">
                                                    Change
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center">
                                            <CircularProgress
                                                aria-label="Loading Landing Image"
                                                classNames={{
                                                    svg: "w-36 h-36 ",
                                                    indicator:
                                                        "stroke-green-500",
                                                    track: "stroke-neutral-400/50",
                                                    value: "text-3xl font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : currentLandingImage === "" ? (
                                <div className="relative mx-auto mb-8 w-1/2">
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => {
                                                setUploadTarget("landing");
                                                onOpen();
                                            }}
                                            className="cursor-pointer font-bold text-4xl">
                                            Add Image
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mx-auto mb-8 w-1/2">
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_IMAGE_URL +
                                            currentLandingImage
                                        }
                                        height={500}
                                        width={500}
                                        alt="Landing Image"
                                        className="w-full h-auto"
                                    />
                                    <div
                                        onClick={() => {
                                            setUploadTarget("landing");
                                            onOpen();
                                        }}
                                        className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                        <div className="my-auto font-bold text-white text-4xl">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <label className="font-bold" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            {...landingRegister("title", {
                                required: {
                                    value: true,
                                    message: "Title is required.",
                                },
                            })}
                            placeholder={
                                landingErrors.title
                                    ? landingErrors.title.message
                                    : "Title"
                            }
                            className={
                                landingErrors.title
                                    ? "placeholder:text-red-400"
                                    : ""
                            }
                        />
                        <label className="font-bold" htmlFor="title">
                            Tech{" "}
                            <span className="text-sm font-light">
                                (Click to remove)
                            </span>
                        </label>
                        <div className="flex flex-wrap gap-2 my-4">
                            {techFields.map((field, index) => {
                                return (
                                    <Chip
                                        onClick={() => {
                                            techRemove(index);
                                        }}
                                        classNames={{
                                            base: "bg-green-500 cursor-pointer",
                                        }}
                                        key={field.id}>
                                        {field.name}
                                    </Chip>
                                );
                            })}
                        </div>

                        <label className="font-bold" htmlFor="newTech">
                            Add New
                        </label>
                        <div>
                            <input
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                name="newTech"
                                type="text"
                                className="!w-1/2"
                            />
                            <Button
                                isDisabled={newTech === ""}
                                onClick={() => {
                                    techAppend({
                                        name: newTech,
                                        landingId: "landing",
                                        order: 0,
                                    });
                                    setNewTech("");
                                }}
                                className="bg-green-500 ms-4">
                                Add
                            </Button>
                        </div>
                        <label className="font-bold" htmlFor="copy">
                            Copy
                        </label>
                        <textarea
                            ref={(e) => {
                                landingRef(e);
                                landingFormTextArea.current = e;
                            }}
                            placeholder={
                                landingErrors.copy
                                    ? landingErrors.copy.message
                                    : "Copy"
                            }
                            className={
                                landingErrors.copy
                                    ? "placeholder:text-red-400"
                                    : ""
                            }
                            {...landingRest}
                        />
                        <label className="font-bold" htmlFor="Short About">
                            Short About
                        </label>
                        <textarea
                            ref={(e) => {
                                shortAboutRef(e);
                                shortAboutTextArea.current = e;
                            }}
                            placeholder={
                                landingErrors.shortAbout
                                    ? landingErrors.shortAbout.message
                                    : "Short About"
                            }
                            className={
                                landingErrors.shortAbout
                                    ? "placeholder:text-red-400"
                                    : ""
                            }
                            {...shortAboutRest}
                        />
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                            <div>
                                <p className="font-bold text-center">
                                    First Highlight
                                </p>
                                <label
                                    className="font-bold"
                                    htmlFor="firstHighlightIcon">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister("firstHighlightIcon", {
                                        required: {
                                            value: true,
                                            message: "Icon is required.",
                                        },
                                    })}
                                    placeholder={
                                        landingErrors.firstHighlightIcon
                                            ? landingErrors.firstHighlightIcon
                                                  .message
                                            : "Icon"
                                    }
                                    className={
                                        landingErrors.firstHighlightIcon
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="firstHighlightHeader">
                                    Header
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister(
                                        "firstHighlightHeader",
                                        {
                                            required: {
                                                value: true,
                                                message: "Header is required.",
                                            },
                                        }
                                    )}
                                    placeholder={
                                        landingErrors.firstHighlightHeader
                                            ? landingErrors.firstHighlightHeader
                                                  .message
                                            : "Header"
                                    }
                                    className={
                                        landingErrors.firstHighlightHeader
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="firstHighlightText">
                                    Copy
                                </label>
                                <textarea
                                    ref={(e) => {
                                        firstHighlightTextRef(e);
                                        firstHighlightTextArea.current = e;
                                    }}
                                    placeholder={
                                        landingErrors.firstHighlightText
                                            ? landingErrors.firstHighlightText
                                                  .message
                                            : "Copy"
                                    }
                                    className={
                                        landingErrors.firstHighlightText
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                    {...firstHighlightTextRest}
                                />
                            </div>

                            <div>
                                <p className="font-bold text-center">
                                    Second Highlight
                                </p>
                                <label
                                    className="font-bold"
                                    htmlFor="secondHighlightIcon">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister("secondHighlightIcon", {
                                        required: {
                                            value: true,
                                            message: "Icon is required.",
                                        },
                                    })}
                                    placeholder={
                                        landingErrors.secondHighlightIcon
                                            ? landingErrors.secondHighlightIcon
                                                  .message
                                            : "Icon"
                                    }
                                    className={
                                        landingErrors.secondHighlightIcon
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="secondHighlightHeader">
                                    Header
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister(
                                        "secondHighlightHeader",
                                        {
                                            required: {
                                                value: true,
                                                message: "Header is required.",
                                            },
                                        }
                                    )}
                                    placeholder={
                                        landingErrors.secondHighlightHeader
                                            ? landingErrors
                                                  .secondHighlightHeader.message
                                            : "Header"
                                    }
                                    className={
                                        landingErrors.secondHighlightHeader
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="secondHighlightText">
                                    Copy
                                </label>
                                <textarea
                                    ref={(e) => {
                                        secondHighlightTextRef(e);
                                        secondHighlightTextArea.current = e;
                                    }}
                                    placeholder={
                                        landingErrors.secondHighlightText
                                            ? landingErrors.secondHighlightText
                                                  .message
                                            : "Copy"
                                    }
                                    className={
                                        landingErrors.secondHighlightText
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                    {...secondHighlightTextRest}
                                />
                            </div>

                            <div>
                                <p className="font-bold text-center">
                                    Third Highlight
                                </p>
                                <label
                                    className="font-bold"
                                    htmlFor="thirdHighlightIcon">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister("thirdHighlightIcon", {
                                        required: {
                                            value: true,
                                            message: "Icon is required.",
                                        },
                                    })}
                                    placeholder={
                                        landingErrors.thirdHighlightIcon
                                            ? landingErrors.thirdHighlightIcon
                                                  .message
                                            : "Icon"
                                    }
                                    className={
                                        landingErrors.thirdHighlightIcon
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="thirdHighlightHeader">
                                    Header
                                </label>
                                <input
                                    type="text"
                                    {...landingRegister(
                                        "thirdHighlightHeader",
                                        {
                                            required: {
                                                value: true,
                                                message: "Header is required.",
                                            },
                                        }
                                    )}
                                    placeholder={
                                        landingErrors.thirdHighlightHeader
                                            ? landingErrors.thirdHighlightHeader
                                                  .message
                                            : "Header"
                                    }
                                    className={
                                        landingErrors.thirdHighlightHeader
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                                <label
                                    className="font-bold"
                                    htmlFor="thirdHighlightText">
                                    Copy
                                </label>
                                <textarea
                                    ref={(e) => {
                                        thirdHighlightTextRef(e);
                                        thirdHighlightTextArea.current = e;
                                    }}
                                    placeholder={
                                        landingErrors.thirdHighlightText
                                            ? landingErrors.thirdHighlightText
                                                  .message
                                            : "Copy"
                                    }
                                    className={
                                        landingErrors.thirdHighlightText
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                    {...thirdHighlightTextRest}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-green-500">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="basis-1/2 bg-neutral-100 mx-4 p-4 rounded-lg">
                    <div className="font-bold text-4xl border-b-2 pb-2">
                        About
                    </div>
                    <form
                        className="mt-10"
                        onSubmit={aboutHandleSubmit(OnSubmitAbout)}>
                        <div className="grid grid-cols-2 gap-0 w-2/3 mx-auto">
                            {props.aboutContent ? (
                                <div className="relative mx-auto">
                                    {currentAbout1Image !== "" ? (
                                        <>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    currentAbout1Image
                                                }
                                                height={500}
                                                width={500}
                                                alt="About 1 Image"
                                                className="w-full h-auto"
                                            />
                                            <div
                                                onClick={() => {
                                                    setUploadTarget("about1");
                                                    onOpen();
                                                }}
                                                className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                                <div className="my-auto font-bold text-white text-4xl">
                                                    Change
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center h-full">
                                            <CircularProgress
                                                aria-label="Loading Landing Image"
                                                classNames={{
                                                    base: "my-auto",
                                                    svg: "w-36 h-36 ",
                                                    indicator:
                                                        "stroke-green-500",
                                                    track: "stroke-neutral-400/50",
                                                    value: "text-3xl font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : currentAbout1Image === "" ? (
                                <div className="relative m-auto">
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => {
                                                setUploadTarget("about1");
                                                onOpen();
                                            }}
                                            className="cursor-pointer font-bold text-4xl">
                                            Add Image
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mx-auto">
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_IMAGE_URL +
                                            currentAbout1Image
                                        }
                                        height={500}
                                        width={500}
                                        alt="Landing Image"
                                        className="w-full h-auto"
                                    />
                                    <div
                                        onClick={() => {
                                            setUploadTarget("about1");
                                            onOpen();
                                        }}
                                        className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                        <div className="my-auto font-bold text-white text-4xl">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.aboutContent ? (
                                <div className="relative mx-auto">
                                    {currentAbout2Image !== "" ? (
                                        <>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    currentAbout2Image
                                                }
                                                height={500}
                                                width={500}
                                                alt="About 1 Image"
                                                className="w-full h-auto"
                                            />
                                            <div
                                                onClick={() => {
                                                    setUploadTarget("about2");
                                                    onOpen();
                                                }}
                                                className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                                <div className="my-auto font-bold text-white text-4xl">
                                                    Change
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center h-full">
                                            <CircularProgress
                                                aria-label="Loading Landing Image"
                                                classNames={{
                                                    base: "my-auto",
                                                    svg: "w-36 h-36 ",
                                                    indicator:
                                                        "stroke-green-500",
                                                    track: "stroke-neutral-400/50",
                                                    value: "text-3xl font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : currentAbout2Image === "" ? (
                                <div className="relative m-auto">
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => {
                                                setUploadTarget("about2");
                                                onOpen();
                                            }}
                                            className="cursor-pointer font-bold text-4xl">
                                            Add Image
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mx-auto">
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_IMAGE_URL +
                                            currentAbout2Image
                                        }
                                        height={500}
                                        width={500}
                                        alt="Landing Image"
                                        className="w-full h-auto"
                                    />
                                    <div
                                        onClick={() => {
                                            setUploadTarget("about2");
                                            onOpen();
                                        }}
                                        className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                        <div className="my-auto font-bold text-white text-4xl">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.aboutContent ? (
                                <div className="relative mx-auto">
                                    {currentAbout3Image !== "" ? (
                                        <>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    currentAbout3Image
                                                }
                                                height={500}
                                                width={500}
                                                alt="About 1 Image"
                                                className="w-full h-auto"
                                            />
                                            <div
                                                onClick={() => {
                                                    setUploadTarget("about3");
                                                    onOpen();
                                                }}
                                                className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                                <div className="my-auto font-bold text-white text-4xl">
                                                    Change
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center h-full">
                                            <CircularProgress
                                                aria-label="Loading Landing Image"
                                                classNames={{
                                                    base: "my-auto",
                                                    svg: "w-36 h-36 ",
                                                    indicator:
                                                        "stroke-green-500",
                                                    track: "stroke-neutral-400/50",
                                                    value: "text-3xl font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : currentAbout3Image === "" ? (
                                <div className="relative m-auto">
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => {
                                                setUploadTarget("about3");
                                                onOpen();
                                            }}
                                            className="cursor-pointer font-bold text-4xl">
                                            Add Image
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mx-auto">
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_IMAGE_URL +
                                            currentAbout3Image
                                        }
                                        height={500}
                                        width={500}
                                        alt="Landing Image"
                                        className="w-full h-auto"
                                    />
                                    <div
                                        onClick={() => {
                                            setUploadTarget("about3");
                                            onOpen();
                                        }}
                                        className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                        <div className="my-auto font-bold text-white text-4xl">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.aboutContent ? (
                                <div className="relative mx-auto">
                                    {currentAbout4Image !== "" ? (
                                        <>
                                            <Image
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                    currentAbout4Image
                                                }
                                                height={500}
                                                width={500}
                                                alt="About 1 Image"
                                                className="w-full h-auto"
                                            />
                                            <div
                                                onClick={() => {
                                                    setUploadTarget("about4");
                                                    onOpen();
                                                }}
                                                className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                                <div className="my-auto font-bold text-white text-4xl">
                                                    Change
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center h-full">
                                            <CircularProgress
                                                aria-label="Loading Landing Image"
                                                classNames={{
                                                    base: "my-auto",
                                                    svg: "w-36 h-36 ",
                                                    indicator:
                                                        "stroke-green-500",
                                                    track: "stroke-neutral-400/50",
                                                    value: "text-3xl font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : currentAbout4Image === "" ? (
                                <div className="relative m-auto">
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => {
                                                setUploadTarget("about4");
                                                onOpen();
                                            }}
                                            className="cursor-pointer font-bold text-4xl">
                                            Add Image
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mx-auto">
                                    <Image
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_IMAGE_URL +
                                            currentAbout4Image
                                        }
                                        height={500}
                                        width={500}
                                        alt="Landing Image"
                                        className="w-full h-auto"
                                    />
                                    <div
                                        onClick={() => {
                                            setUploadTarget("about4");
                                            onOpen();
                                        }}
                                        className="cursor-pointer opacity-0 hover:opacity-100 transition-all absolute top-0 left-0 h-full w-full bg-neutral-400 bg-opacity-75 flex justify-center">
                                        <div className="my-auto font-bold text-white text-4xl">
                                            Change
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <label className="font-bold" htmlFor="title1">
                            Image Titles
                        </label>
                        <div className="grid grid-cols-2">
                            <div>
                                <input
                                    type="text"
                                    {...aboutRegister("title1", {
                                        required: {
                                            value: true,
                                            message: "Title is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.title1
                                            ? aboutErrors.title1.message
                                            : "Title"
                                    }
                                    className={
                                        aboutErrors.title1
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...aboutRegister("title2", {
                                        required: {
                                            value: true,
                                            message: "Title is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.title2
                                            ? aboutErrors.title2.message
                                            : "Title"
                                    }
                                    className={
                                        aboutErrors.title2
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...aboutRegister("title3", {
                                        required: {
                                            value: true,
                                            message: "Title is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.title3
                                            ? aboutErrors.title3.message
                                            : "Title"
                                    }
                                    className={
                                        aboutErrors.title3
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    {...aboutRegister("title4", {
                                        required: {
                                            value: true,
                                            message: "Title is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.title4
                                            ? aboutErrors.title4.message
                                            : "Title"
                                    }
                                    className={
                                        aboutErrors.title4
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <label className="font-bold" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            {...aboutRegister("title", {
                                required: {
                                    value: true,
                                    message: "Title is required.",
                                },
                            })}
                            placeholder={
                                aboutErrors.title
                                    ? aboutErrors.title.message
                                    : "Title"
                            }
                            className={
                                aboutErrors.title
                                    ? "placeholder:text-red-400"
                                    : ""
                            }
                        />
                        <div className="flex justify-between gap-8">
                            <div className="w-1/2">
                                <label className="font-bold" htmlFor="title">
                                    Text 1
                                </label>
                                <input
                                    type="text"
                                    {...aboutRegister("text1", {
                                        required: {
                                            value: true,
                                            message: "Text is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.text1
                                            ? aboutErrors.text1.message
                                            : "Text 1"
                                    }
                                    className={
                                        aboutErrors.text1
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="font-bold" htmlFor="title">
                                    Text 2
                                </label>
                                <input
                                    type="text"
                                    {...aboutRegister("text2", {
                                        required: {
                                            value: true,
                                            message: "Text is required.",
                                        },
                                    })}
                                    placeholder={
                                        aboutErrors.text2
                                            ? aboutErrors.text2.message
                                            : "Text 2"
                                    }
                                    className={
                                        aboutErrors.text2
                                            ? "placeholder:text-red-400"
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <label className="font-bold" htmlFor="copy">
                            Copy
                        </label>
                        <textarea
                            ref={(e) => {
                                aboutRef(e);
                                aboutFormTextArea.current = e;
                            }}
                            placeholder={
                                aboutErrors.copy
                                    ? aboutErrors.copy.message
                                    : "Copy"
                            }
                            className={
                                aboutErrors.copy
                                    ? "placeholder:text-red-400"
                                    : ""
                            }
                            {...aboutRest}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-green-500">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                scrollBehavior="outside"
                backdrop="blur"
                size={uploadForm ? "xl" : "5xl"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex text-4xl text-center flex-col gap-1">
                                {uploadForm ? "Upload Image" : "Select Image"}
                            </ModalHeader>
                            <ModalBody>
                                {uploadForm ? (
                                    <div>
                                        {uploading ? (
                                            <div className="flex justify-center">
                                                <CircularProgress
                                                    aria-label="Uploading"
                                                    value={uploadProgress}
                                                    classNames={{
                                                        svg: "w-36 h-36 ",
                                                        indicator:
                                                            "stroke-green-500",
                                                        track: "stroke-neutral-400/50",
                                                        value: "text-3xl font-semibold text-white",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-full">
                                                <label
                                                    id="drop_zone"
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        dropHandler(e);
                                                    }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {imageToUpload ===
                                                        null ? (
                                                            <>
                                                                <svg
                                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 20 16">
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                    />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span className="font-semibold">
                                                                        Click to
                                                                        upload
                                                                    </span>{" "}
                                                                    or drag and
                                                                    drop
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">
                                                                    {
                                                                        imageToUpload?.name
                                                                    }
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <input
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.files
                                                            ) {
                                                                setImageToUpload(
                                                                    e.target
                                                                        .files[0]
                                                                );
                                                            }
                                                        }}
                                                        id="dropzone-file"
                                                        name="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 ">
                                        {props.images.map(
                                            (image: Images, index: number) => {
                                                return (
                                                    <div
                                                        className="relative bg-neutral-200 p-4 shadow"
                                                        key={image.url}>
                                                        <Image
                                                            src={
                                                                process.env
                                                                    .NEXT_PUBLIC_BASE_IMAGE_URL +
                                                                image.url
                                                            }
                                                            alt={image.url}
                                                            width={400}
                                                            height={400}
                                                            className="w-full h-auto"
                                                        />
                                                        <div
                                                            onClick={(e) => {
                                                                switch (
                                                                    uploadTarget
                                                                ) {
                                                                    case "landing":
                                                                        landingSetValue(
                                                                            "imageUrl",
                                                                            image.url
                                                                        );
                                                                        setCurrentLandingImage(
                                                                            image.url
                                                                        );
                                                                        onClose();
                                                                        return;
                                                                    case "about1":
                                                                        aboutSetValue(
                                                                            "image1Url",
                                                                            image.url
                                                                        );
                                                                        setCurrentAbout1Image(
                                                                            image.url
                                                                        );
                                                                        onClose();
                                                                        return;
                                                                    case "about2":
                                                                        aboutSetValue(
                                                                            "image2Url",
                                                                            image.url
                                                                        );
                                                                        setCurrentAbout2Image(
                                                                            image.url
                                                                        );
                                                                        onClose();
                                                                        return;
                                                                    case "about3":
                                                                        aboutSetValue(
                                                                            "image3Url",
                                                                            image.url
                                                                        );
                                                                        setCurrentAbout3Image(
                                                                            image.url
                                                                        );
                                                                        onClose();
                                                                        return;
                                                                    case "about4":
                                                                        aboutSetValue(
                                                                            "image4Url",
                                                                            image.url
                                                                        );
                                                                        setCurrentAbout4Image(
                                                                            image.url
                                                                        );
                                                                        onClose();
                                                                        return;
                                                                }
                                                            }}
                                                            className="absolute cursor-pointer flex justify-center opacity-0 hover:opacity-100 top-0 left-0 w-full h-full bg-neutral-400 bg-opacity-75 transition-all duration-300">
                                                            <div className="my-auto font-bold text-white text-4xl">
                                                                Select
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() => {
                                        setImageToUpload(null);
                                        setUploading(false);
                                        setUploadTarget("");
                                        setUploadForm(
                                            props.images.length > 0
                                                ? false
                                                : true
                                        );
                                        onClose();
                                    }}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-green-500"
                                    isDisabled={
                                        imageToUpload === null && uploadForm
                                            ? true
                                            : false
                                    }
                                    onPress={() => {
                                        if (uploadForm) {
                                            if (imageToUpload !== null) {
                                                uploadImage(imageToUpload);
                                            }
                                        } else {
                                            setUploadForm(true);
                                        }
                                    }}>
                                    {uploadForm ? "Upload" : "Switch to Upload"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
