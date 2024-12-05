import PrivacyModalLink from "@/components/main/PrivacyModalLink";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main>
            <section className="top-0 left-0 overflow-x-hidden xl:py-40 py-20">
                <article className="fade-in min-h-screen flex flex-col xl:w-[75dvw] w-[90dvw] mx-auto">
                    <div className="">
                        <div className="xl:flex justify-center xl:px-20">
                            <h2 className="xl:text-6xl text-5xl font-bold text-center mt-10 mb-5 xl:mt-0">
                                Your Privacy is Important.
                            </h2>
                        </div>
                        <div className="xl:px-20 mb-10">
                            <div className="strong text-3xl text-green-500">
                                Privacy Policy
                            </div>
                            <em className="text-base">
                                Last updated: August 05, 2024
                            </em>
                            <br />
                            <p>
                                This Privacy Policy describes Our policies and
                                procedures on the collection, use and disclosure
                                of Your information when You use the Service and
                                tells You about Your privacy rights and how the
                                law protects You. <br />
                                <br />
                                We use Your Personal data only through means
                                that you have contacted us through the website
                                contact form. By using the contact Service, You
                                agree to the collection and use of information
                                in accordance with this Privacy Policy.
                            </p>
                            <div className="strong text-2xl underline text-green-500">
                                Interpretation and Definitions
                            </div>
                            <div className="strong text-xl mt-4 text-green-500">
                                Interpretation
                            </div>
                            <p>
                                The words of which the initial letter is
                                capitalized have meanings defined under the
                                following conditions. The following definitions
                                shall have the same meaning regardless of
                                whether they appear in singular or in plural.
                            </p>
                            <div className="strong text-xl mt-4 text-green-500">
                                Definitions
                            </div>
                            <p>For the purposes of this Privacy Policy:</p>
                            <ul className="px-5">
                                <li>
                                    <strong className="text-green-500">
                                        Company
                                    </strong>{" "}
                                    (referred to as either &quot;the
                                    Company&quot;, &quot;We&quot;,
                                    &quot;Us&quot; or &quot;Our&quot; in this
                                    Agreement) refers to kitmakesthings.
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Cookies
                                    </strong>{" "}
                                    are small files that are placed on Your
                                    computer, mobile device or any other device
                                    by a website, containing the details of Your
                                    browsing history on that website among its
                                    many uses.
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Country
                                    </strong>{" "}
                                    refers to: United Kingdom
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Device
                                    </strong>{" "}
                                    means any device that can access the Service
                                    such as a computer, a mobile phone or a
                                    digital tablet.
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Personal
                                    </strong>{" "}
                                    Data is any information that relates to an
                                    identified or identifiable individual.
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Service
                                    </strong>{" "}
                                    refers to the Website.
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Usage Data
                                    </strong>{" "}
                                    refers to data collected automatically,
                                    either generated by the use of the Service
                                    or from the Service infrastructure itself
                                    (for example, the duration of a page visit).
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        Website
                                    </strong>{" "}
                                    refers to kitmakesthings, accessible from{" "}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-green-500"
                                        href="https://kitmakesthings.co.uk">
                                        kitmakesthings.co.uk
                                    </a>
                                </li>
                                <li>
                                    <strong className="text-green-500">
                                        You
                                    </strong>{" "}
                                    means the individual accessing or using the
                                    Service, or the company, or other legal
                                    entity on behalf of which such individual is
                                    accessing or using the Service, as
                                    applicable.
                                </li>
                            </ul>
                            <div className="text-2xl underline text-green-500 mt-5">
                                Collecting and Using Your Personal Data
                            </div>
                            <div className="text-xl mt-4 text-green-500">
                                Types of Data Collected
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Personal Data
                                </em>
                                <p className="text-base">
                                    While using Our Service, We may ask You to
                                    provide Us with certain personally
                                    identifiable information that can be used to
                                    contact or identify You. Personally
                                    identifiable information includes:
                                </p>
                                <ul className="px-5">
                                    <li>Email Address</li>
                                    <li>First name and last name</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Use of Your Personal Data
                                </em>
                                <p className="text-base">
                                    The Company may use Personal Data for the
                                    following purposes:
                                </p>
                                <ul className="px-5">
                                    <li>
                                        <strong className="text-green-500">
                                            For the performance of a contract:
                                        </strong>{" "}
                                        the development, compliance and
                                        undertaking of the purchase contract for
                                        the products, items or services You have
                                        purchased or of any other contract with
                                        Us through the Service.
                                    </li>
                                    <li>
                                        To contact You:
                                        <strong className="text-green-500">
                                            To contact You:
                                        </strong>{" "}
                                        To contact You by email, telephone
                                        calls, SMS, or other equivalent forms of
                                        electronic communication, such as a
                                        mobile application&apos;s push
                                        notifications regarding updates or
                                        informative communications related to
                                        the functionalities, products or
                                        contracted services, including the
                                        security updates, when necessary or
                                        reasonable for their implementation.
                                    </li>
                                    <li>
                                        <strong className="text-green-500">
                                            To manage Your requests:
                                        </strong>{" "}
                                        To attend and manage Your requests to
                                        Us.
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Retention of Your Personal Data
                                </em>
                                <p className="text-base">
                                    The Company will retain Your Personal Data
                                    only for as long as is necessary for the
                                    purposes set out in this Privacy Policy. We
                                    will retain and use Your Personal Data to
                                    the extent necessary to comply with our
                                    legal obligations (for example, if we are
                                    required to retain your data to comply with
                                    applicable laws), resolve disputes, and
                                    enforce our legal agreements and policies.
                                </p>
                                <p>
                                    The Company will take all steps reasonably
                                    necessary to ensure that Your data is
                                    treated securely and in accordance with this
                                    Privacy Policy and no transfer of Your
                                    Personal Data will take place to an
                                    organization or a country unless there are
                                    adequate controls in place including the
                                    security of Your data and other personal
                                    information.
                                </p>
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Delete Your Personal Data
                                </em>
                                <p className="text-base">
                                    You have the right to delete or request that
                                    We assist in deleting the Personal Data that
                                    We have collected about You.
                                </p>
                            </div>
                            <div className="text-xl mt-4 text-green-500">
                                Disclosure of Your Personal Data
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Law enforcement
                                </em>
                                <p className="text-base">
                                    Under certain circumstances, the Company may
                                    be required to disclose Your Personal Data
                                    if required to do so by law or in response
                                    to valid requests by public authorities
                                    (e.g. a court or a government agency).
                                </p>
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Other legal requirements
                                </em>
                                <p className="text-base">
                                    The Company may disclose Your Personal Data
                                    in the good faith belief that such action is
                                    necessary to:
                                </p>
                                <ul className="px-5">
                                    <li>Comply with a legal obligation</li>
                                    <li>
                                        Protect and defend the rights or
                                        property of the Company
                                    </li>
                                    <li>
                                        Prevent or investigate possible
                                        wrongdoing in connection with the
                                        Service
                                    </li>
                                    <li>
                                        Protect the personal safety of Users of
                                        the Service or the public
                                    </li>
                                    <li>Protect against legal liability</li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <em className="text-base text-green-500">
                                    Security of Your Personal Data
                                </em>
                                <p className="text-base">
                                    The security of Your Personal Data is
                                    important to Us, but remember that no method
                                    of transmission over the Internet, or method
                                    of electronic storage is 100% secure. While
                                    We strive to use commercially acceptable
                                    means to protect Your Personal Data, We
                                    cannot guarantee its absolute security.
                                </p>
                            </div>
                            <div className="text-xl mt-4 text-green-500">
                                Links to Other Websites
                            </div>
                            <p>
                                Our Service may contain links to other websites
                                that are not operated by Us. If You click on a
                                third party link, You will be directed to that
                                third party&apos;s site. We strongly advise You
                                to review the Privacy Policy of every site You
                                visit.
                            </p>
                            <p>
                                We have no control over and assume no
                                responsibility for the content, privacy policies
                                or practices of any third party sites or
                                services.
                            </p>
                            <div className="text-xl mt-4 text-green-500">
                                Changes to this Privacy Policy
                            </div>
                            <p>
                                We may update Our Privacy Policy from time to
                                time. We will notify You of any changes by
                                posting the new Privacy Policy on this page.
                            </p>
                            <p>
                                You are advised to review this Privacy Policy
                                periodically for any changes. Changes to this
                                Privacy Policy are effective when they are
                                posted on this page.
                            </p>
                            <div className="text-xl mt-4 text-green-500">
                                Contact Us
                            </div>
                            <p>
                                If you have any questions about this Privacy
                                Policy, You can contact us:
                            </p>
                            <ul className="px-5">
                                <li>
                                    Through our <PrivacyModalLink />.
                                </li>
                                <li>
                                    By Emailing:{" "}
                                    <Link
                                        className="text-green-500"
                                        href={
                                            "mailto:kitmakesthings@gmail.com"
                                        }>
                                        kitmakesthings@gmail.com
                                    </Link>
                                    .
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}
