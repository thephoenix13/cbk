import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Steps = ({ children }: { children: ReactNode }) => (
  <ol className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-accent">{children}</ol>
);
const Tip = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 rounded-md border-l-4 border-accent bg-accent/10 p-3 text-sm">{children}</p>
);
const Body = ({ children }: { children: ReactNode }) => (
  <div className="space-y-3 text-sm leading-relaxed text-foreground/90">{children}</div>
);

const topics: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "start",
    title: "1. Signing in and out",
    body: (
      <Body>
        <Steps>
          <li>Open <strong>www.cbkinfraprojects.com/admin</strong> in your browser (save it as a bookmark).</li>
          <li>Enter your admin email and password, then press <strong>Sign in</strong>.</li>
          <li>When you finish, press <strong>Sign out</strong> at the bottom of the left menu, especially on a shared computer.</li>
        </Steps>
        <Tip>If you forget your password, ask your website developer to reset it. Only people with a registered admin account can sign in.</Tip>
      </Body>
    ),
  },
  {
    id: "how",
    title: "2. How editing works (please read first)",
    body: (
      <Body>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Save means live.</strong> There is no draft step. When you press <strong>Save</strong>, the change goes to the website straight away. Visitors may need to refresh their page, and it can take up to a minute to show for everyone.</li>
          <li>Each block has its own <strong>Save changes</strong> button. Saving one block does not save the others on the same page.</li>
          <li>The text “You have unsaved changes” appears next to the button when you have edited something and not saved it yet. If you leave the page, those edits are lost.</li>
          <li><strong>Restore original</strong> puts back the text the website launched with. It does not save until you press Save.</li>
          <li>To check your work, press <strong>View website</strong> in the left menu. It opens the site in a new tab.</li>
        </ul>
      </Body>
    ),
  },
  {
    id: "pages",
    title: "3. Changing the text on a page",
    body: (
      <Body>
        <Steps>
          <li>In the left menu, under <strong>Pages</strong>, choose the page (Home, About, Services, Our Approach, Our Work or Contact).</li>
          <li>Click a block's name (for example “Hero banner” or “Core values”) to open it.</li>
          <li>Change the text, then press <strong>Save changes</strong> at the bottom of that block.</li>
        </Steps>
        <p><strong>Lists</strong> (services, values, steps and so on) work the same everywhere:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Add</strong> a new item with the Add button under the list.</li>
          <li>Use the <strong>up and down arrows</strong> to change the order.</li>
          <li>Use the <strong>bin</strong> icon to remove an item.</li>
          <li><strong>Icon</strong> fields let you pick a small symbol from a list.</li>
        </ul>
        <Tip>Keep titles short. Long titles can wrap onto several lines and make cards uneven.</Tip>
      </Body>
    ),
  },
  {
    id: "rich",
    title: "4. Using the text editor (bold, lists, links)",
    body: (
      <Body>
        <p>Longer paragraphs such as “Who we are”, “Our story” and project descriptions have a formatting bar above the text:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>B / I / U</strong>: bold, italic, underline. Select the words first.</li>
          <li><strong>H2 / H3</strong>: a heading or a smaller sub-heading.</li>
          <li><strong>Bullet and number lists</strong>: click the list buttons and type each point on a new line.</li>
          <li><strong>Link</strong>: select the words, click the chain icon and paste the web address (it must start with https://). Clear the box and confirm to remove a link.</li>
          <li><strong>Undo / Redo</strong>: arrows at the end of the bar.</li>
        </ul>
        <Tip>When you paste text from Word or a web page, check that the look still matches the rest of the site. Only simple formatting is kept; fonts and colours are removed on purpose.</Tip>
      </Body>
    ),
  },
  {
    id: "images",
    title: "5. Adding and replacing pictures",
    body: (
      <Body>
        <p>Wherever a picture can be changed you will see three buttons:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Upload new</strong>: choose a file from your computer.</li>
          <li><strong>Library</strong>: pick a picture you uploaded before.</li>
          <li><strong>Remove</strong>: go back to the website's standard picture (or the placeholder).</li>
        </ul>
        <p>After choosing a picture, remember to press <strong>Save changes</strong> for that block.</p>
        <p><strong>Good to know</strong></p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Accepted types: JPG, PNG, WebP and SVG. The maximum is 5 MB per file.</li>
          <li>Large photos are <strong>shrunk and compressed automatically</strong>, so you do not need to resize them.</li>
          <li>Best sizes: hero banner at least 1600 px wide; project and service photos landscape (about 4:3); logos on a white or transparent background.</li>
          <li>Give people a clear, well-lit photo. Pictures of faces or vehicles need the person's permission.</li>
        </ul>
      </Body>
    ),
  },
  {
    id: "settings",
    title: "6. Site settings: logo, phone, address, footer",
    body: (
      <Body>
        <p>Open <Link to="/admin/settings" className="font-medium text-accent underline">Site settings</Link>. These details appear on several pages at once.</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Logo</strong>: shown in the top bar of every page.</li>
          <li><strong>Phone numbers</strong>: add each person's name and number with the country code (for example +91 98765 43210). WhatsApp links on the Contact page are created from these numbers.</li>
          <li><strong>Address, email, GST</strong>: used in the footer and on the Contact page. Press Enter to start a new address line.</li>
          <li><strong>Footer line</strong>: the small copyright text at the very bottom. Update the year here when needed.</li>
          <li><strong>Browser tab title and search description</strong>: what people see on Google and in the browser tab. Keep the title under about 60 characters and the description under about 160.</li>
        </ul>
      </Body>
    ),
  },
  {
    id: "projects",
    title: "7. Projects (Our Work page)",
    body: (
      <Body>
        <p>Open <Link to="/admin/projects" className="font-medium text-accent underline">Projects</Link>.</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Add project</strong>: fill in the title, client, location, category, description and key points. Add a cover picture and, if you like, more photos.</li>
          <li><strong>Pencil</strong>: edit a project. <strong>Arrows</strong>: change the order. <strong>Bin</strong>: delete permanently.</li>
          <li>Switch off <strong>Show on the website</strong> to hide a project without deleting it. Hidden projects show a “Hidden” label in the list.</li>
          <li>Projects with extra photos show a “photos” button on the website that opens a gallery.</li>
          <li>The category list comes from <em>Our Work</em> page &rarr; <em>Project categories</em>. Add a category there first if you need a new one.</li>
        </ul>
        <Tip>Without a cover picture, the card shows an icon instead. Adding real photos makes the page look far better.</Tip>
      </Body>
    ),
  },
  {
    id: "clients",
    title: "8. Client logos",
    body: (
      <Body>
        <p>Open <Link to="/admin/clients" className="font-medium text-accent underline">Clients</Link>.</p>
        <Steps>
          <li>To add a client, type the company name, add the logo, then press <strong>Add client</strong>.</li>
          <li>Change a name by clicking in the name box, typing, and clicking away. It saves by itself.</li>
          <li>Use <strong>Visible</strong> to hide or show a logo, the <strong>arrows</strong> to reorder, and the <strong>bin</strong> to delete.</li>
        </Steps>
      </Body>
    ),
  },
  {
    id: "media",
    title: "9. Media library",
    body: (
      <Body>
        <p>Open <Link to="/admin/media" className="font-medium text-accent underline">Media library</Link> to see every picture you have uploaded.</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Upload pictures</strong> lets you add several at once.</li>
          <li>The copy icon copies a picture's web address.</li>
          <li><strong>Be careful when deleting.</strong> If a picture is still used on a page, that spot will go blank. Replace it on the page first, then delete the old file.</li>
        </ul>
      </Body>
    ),
  },
  {
    id: "contact",
    title: "10. The Contact page and enquiries",
    body: (
      <Body>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Edit the wording and the “Service Required” choices under <em>Contact</em> page &rarr; <em>Enquiry form</em>.</li>
          <li>The map comes from a Google Maps “embed” address. In Google Maps choose Share &rarr; Embed a map, and copy only the address inside <code>src="..."</code>.</li>
          <li>Enquiries are <strong>not stored</strong> in this admin. At the moment, after a visitor presses Send, their own email app opens with the enquiry ready to send to your email address. Your developer can switch this to automatic emails.</li>
        </ul>
      </Body>
    ),
  },
  {
    id: "trouble",
    title: "11. Something is not working",
    body: (
      <Body>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">I saved, but the website did not change.</p>
            <p>Refresh the website page (press Ctrl + F5). Make sure you pressed <strong>Save changes</strong> and saw the green “Saved” message. Wait one minute and try again.</p>
          </div>
          <div>
            <p className="font-semibold">“Could not save”, or an error message appears.</p>
            <p>Your sign-in may have expired. Sign out, sign in again, and repeat the change. If you had a long edit, copy your text somewhere safe first.</p>
          </div>
          <div>
            <p className="font-semibold">A picture will not upload.</p>
            <p>Check it is a JPG, PNG, WebP or SVG and under 5 MB. Photos from some phones can be very large; try a smaller copy.</p>
          </div>
          <div>
            <p className="font-semibold">I changed something by mistake.</p>
            <p>Use <strong>Restore original</strong> on that block (then Save) to return to the launch text. For anything else, retype the previous text and Save.</p>
          </div>
          <div>
            <p className="font-semibold">I deleted a project or client.</p>
            <p>Deleting is permanent. Add it again with <strong>Add</strong>. Next time, use the hide switch instead.</p>
          </div>
          <div>
            <p className="font-semibold">I see “No admin access”.</p>
            <p>You are signed in with an account that is not an administrator. Sign out and use the admin email.</p>
          </div>
        </div>
        <Tip>Still stuck? Contact your website developer and mention the page you were on and the message you saw. A screenshot helps.</Tip>
      </Body>
    ),
  },
  {
    id: "tips",
    title: "12. Good habits",
    body: (
      <Body>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Make one change at a time, save, then check it with <strong>View website</strong>.</li>
          <li>Check spelling and phone numbers twice; they appear in several places.</li>
          <li>Use clear photos of real work. Avoid dark, blurry or heavily filtered images.</li>
          <li>Keep text short and plain. Visitors skim.</li>
          <li>Never share your admin password. Always sign out on shared computers.</li>
        </ul>
      </Body>
    ),
  },
];

const GuideAdmin = () => (
  <div className="max-w-3xl">
    <h1 className="mb-1 font-heading text-2xl font-bold">Help &amp; guide</h1>
    <p className="mb-6 text-sm text-muted-foreground">
      Step-by-step help for managing the CBK website. Open a topic below. New here? Start with topics 1 and 2.
    </p>
    <Accordion type="multiple" defaultValue={["how"]} className="rounded-lg border bg-card px-4">
      {topics.map((t) => (
        <AccordionItem key={t.id} value={t.id}>
          <AccordionTrigger className="text-left font-heading text-base">{t.title}</AccordionTrigger>
          <AccordionContent className="pb-5 pt-1">{t.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default GuideAdmin;
