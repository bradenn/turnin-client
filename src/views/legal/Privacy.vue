<template>
  <div>
    <b-container>
      <b-row class="pt-4">
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <Title title-override="Privacy Policy" subtitle="Policy is subject to change"></Title>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row class="pt-1">
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <h5>All you need to know</h5>
          <ul>
            <li>Personal data we collect</li>
            <ul>
              <li>Firstname</li>
              <li>Lastname</li>
              <li>Email</li>
              <li>Username</li>
              <li>Salted password hash</li>
              <li>GitHub Link (Optional)</li>
            </ul>
          </ul>
          <ul>
            <li>Institutional Data Use Disclaimer</li>
            <ul>
              <li>Your institution is able to download your submission files.</li>
              <li>Your institution may not adhere to our privacy policy.</li>
              <li>Requests from an institution regarding personal data will be denied.</li>
            </ul>
          </ul>
          <ul>
            <li>Your personal information will not be sold.</li>
            <li>Your personal information will not be shared with third-parties.</li>
            <li>Your interactions will not be tracked.</li>
            <li>Your preferences will not be tracked.</li>
            <li>Your email will not be spammed.</li>
            <li>Your submissions may be compared to other submissions to check for plagiarism.</li>
            <li>Your credentials are encrypted and not readable by any member of Turnin Technologies LLC, or any
              institution.
            </li>
            <li>Your institution cannot access your personal information.</li>
          </ul>
          <h5>In legal form</h5>
          <p>Your privacy is important to us. It is Turnin Technologies LLC's policy to respect your privacy regarding
            any information we may collect from you across our website, <a
                href="https://www.turnin.co">https://www.turnin.co</a>, and other sites we own and operate.</p>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by
            fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how
            it will be used.</p>
          <p>We only retain collected information for as long as necessary to provide you with your requested service.
            What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as
            unauthorized access, disclosure, copying, use or modification.</p>
          <p>We don’t share any personally identifying information publicly or with third-parties, except when required
            to by law.</p>
          <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control
            over the content and practices of these sites, and cannot accept responsibility or liability for their
            respective privacy policies.</p>
          <p>You are free to refuse our request for your personal information, with the understanding that we may be
            unable to provide you with some of your desired services.</p>
          <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and
            personal information. If you have any questions about how we handle user data and personal information, feel
            free to contact us.</p>
          <p>This policy is effective as of 31 December 2020.</p>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Title from "@/components/Title";

export default {
  name: 'Privacy',
  components: {Title}
}
</script>
