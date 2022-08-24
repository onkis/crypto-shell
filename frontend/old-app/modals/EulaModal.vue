<template lang="pug">
transition(name="modal-animation")
  .modal-backdrop(v-show="modalActive")
    .modal.show
      transition(name="modal-animation-inner")
        .modal-inner.modal-dialog.modal-dialog-centered(v-show="modalActive" role='document')
          .modal-content
            .modal-header
              h5.modal-title.font-weight-normal End User Agreement
            .modal-body
              .eula-content
                .WordSection1
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                        | NOTICE TO USER:
                        o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | Please, read this
                      | carefully. By using all or any portion of the Software you accept all the terms
                      | and conditions of this Agreement. If you do not agree, do not use this
                      | Software.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                        | 1. DEFINITIONS
                        o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | When used in this
                      | Agreement, the following terms shall have the respective meanings indicated,
                      | such meanings to be applicable to both the singular and plural forms of the
                      | terms defined:
                      b
                        o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | &quot;Licensor&quot;
                      | means 
                      span.SpellE RotiPay
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | &quot;Licensee&quot;
                      | means You or Your Company, unless otherwise indicated.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | &quot;Software&quot;
                      | means (a) all of the contents of the files, disk(s), CD-ROM(s), or other media
                      | with which this Agreement is provided, including but not limited to ((
                      span.SpellE i
                      | ) registration information, i.e. License key which is
                      | unique for a registration name of the Licensee; (ii) related explanatory written
                      | materials or files (&quot;Documentation&quot;); and (iii) Software setup files
                      | and code samples (if any); and (b) upgrades, modified versions, updates,
                      | additions, and copies of the Software, if any, licensed to you by Electronic
                      | Team (collectively, &quot;Updates&quot;).
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | &quot;Use&quot; or
                      | &quot;Using&quot; means to access, install, download, copy, or otherwise
                      | benefit from using the functionality of the Software in accordance with the
                      | Documentation.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | &quot;System&quot; means
                      | Windows OS, GNU/Linux or Mac OS X, or any virtual machine.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                        | 2. GENERAL USE&nbsp;
                        o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | You are granted a
                      | non-exclusive License to use the Software for any purposes for an unlimited
                      | period of time.
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | The software product
                      | under this License is provided free of charge. Even though a license fee is not
                      | paid for the use of such software, it does not mean that there are no
                      | conditions for using such software.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 2.1. The Software may be
                      | installed and Used by the Licensee for any legal purpose.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 2.2. The Software may be
                      | installed and Used by the Licensee on any number of systems.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 2.3. The Software can be
                      | copied and distributed under the condition that original copyright notice and
                      | disclaimer of warranty will stay intact and the Licensee will not charge money
                      | or fees for the Software product, except to cover distribution costs.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 2.4. The Licensee will
                      | not have any proprietary rights in and to the Software. The Licensee
                      | acknowledges and agrees that the Licensor retains all copyrights and other
                      | proprietary rights in and to the Software.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 2.5 Use within the scope
                      | of this License is free of charge and no royalty or licensing fees shall be
                      | paid by the Licensee.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                        | 3. INTELLECTUAL PROPERTY
                        | RIGHTS
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.1 This License does
                      | not transmit any intellectual rights on the Software. The Software and any
                      | copies that the Licensee is authorized by the Licensor to make are the
                      | intellectual property of and are owned by the Licensor.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.2 The Software is
                      | protected by copyright, including without limitation by Copyright Law and
                      | international treaty provisions.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.3 Any copies that the
                      | Licensee is permitted to make pursuant to this Agreement must contain the same
                      | copyright and other proprietary notices that appear on or in the Software.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.4 The structure,
                      | organization and code of the Software are the valuable trade secrets and
                      | confidential information of the Licensor. The Licensee agrees not to decompile,
                      | disassemble or otherwise attempt to discover the source code of the Software.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.5 Any attempts to
                      | reverse-engineer, copy, clone, modify or alter in any way the installer program
                      | without the Licensor&rsquo;s specific approval are strictly prohibited. The Lic
                      | nsee
                      | is not authorized to use any plug-in or enhancement that permits to save
                      | modifications to a file with software licensed and distributed by the Licensor.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 3.6 Trademarks shall be
                      | used in accordance with accepted trademark practice, including identification
                      | of trademarks owners&rsquo; names. Trademarks can only be used to identify prin
                      | ed
                      | output produced by the Software and such use of any trademark does not give the
                      | Licensee any rights of ownership in that trademark.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none') 4. WARRANTY
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 4.1 The Licensor
                      | warrants that:
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 4.1.1 The Licensor owns
                      | the Software and documentation and/or is in possession of valid and existing
                      | licenses that support the terms of this Agreement;
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 4.1.2 to the best of the
                      | Licensor&rsquo;s knowledge, the Software does not infringe upon or violate a
                      | intellectual property right of any third party;
                    span(style='font-family:\
                    "Helvetica Neue";mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:\
                    "Times New Roman";color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | 4.2 Except those
                      | warranties specified in section 4.1 above, the Software is being delivered to
                      | the Licensee &quot;AS IS&quot; and the Licensor makes no warranty as to its use
                      | or performance.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | The Licensor does not
                      | and cannot warrant the performance or results the Licensee may obtain by using
                      | the Software. The entire risk arising out of use or performance of the Software
                      | remains with the Licensee.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | The Licensor gives no
                      | warranty, express or implied, that (
                      span.SpellE i
                      | ) the Software
                      | will be of satisfactory quality, suitable for any particular purpose or for any
                      | particular use under specified conditions, notwithstanding that such purpose,
                      | use, or conditions may be known to the Licensor; or (ii) that the Software will
                      | operate error-free or without interruption or that any errors will be
                      | corrected.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                        | 5. LIMITATION OF
                        | LIABILITY
                        o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | In no event will the
                      | Licensor be liable for any damages, claims or costs whatsoever or any
                      | consequential, indirect, incidental damages, or any lost profits or lost
                      | savings, even if the Licensor has been advised of the possibility of such loss,
                      | damages, claims or costs or for any claim by any third party.
                    span(style='font-family:"Helvetica Neue";mso-fareast-font-family:"Times New Roman";\
                    mso-bidi-font-family:"Times New Roman";color:#303030;mso-font-kerning:0pt;\
                    mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | In no event will the
                      | Licensee be liable to the Licensor on condition that the Licensee complies with
                      | all terms and conditions stated in this License.
                    span(style='font-family:\
                    "Helvetica Neue";mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:\
                    "Times New Roman";color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    b
                      span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                      color:#303030;mso-font-kerning:0pt;mso-ligatures:none') 6. NON-WAIVER
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";mso-fareast-font-family:\
                    "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#303030;\
                    mso-font-kerning:0pt;mso-ligatures:none')
                      o:p
                  p.MsoNormal(style='margin-bottom:11.25pt;text-align:justify;line-height:\
                  13.5pt;background:white')
                    span(style='font-size:10.0pt;font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
                      | If a portion of this
                      | agreement is held unenforceable, the remainder shall be valid. It means that if
                      | one section of the Agreement is not lawful, the rest of the Agreement is still
                      | in force. A party&rsquo;s failure to exercise any right under this Agreement wi
                      | l not
                      | constitute a waiver of (a) any other terms or conditions of this Agreement, or
                      | (b) a right at any time thereafter to require exact and strict compliance with
                      | the terms of this Agreement.
                    span(style='font-family:"Helvetica Neue";\
                    mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";\
                    color:#303030;mso-font-kerning:0pt;mso-ligatures:none')
            .modal-footer
              button.btn.bg-gradient-secondary(@click="handleCancel()" type='button') Cancel
              button.btn.bg-gradient-primary(@click="handleValidate()" type='button') Agree
</template>

<script>
export default {
  props: ['modalActive'],
  components: {},
  data() {
    return {
      email: ''
    };
  }, 
  methods: {
    handleCancel(){
      this.close({ eventType: "cancel" });
    },
    handleValidate(){
      this.close({ eventType: "agreed" });
    },
    close(props){
      this.$emit('close', props);
    }
  }
}
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity .3s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-enter-to {
  opacity: 1;
}

.modal-animation-inner-enter-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
  transition-delay: .1s;
}

.modal-animation-inner-leave-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: translateY(-55px) !important;
}

.modal-animation-inner-leave-to {
  transform: translateY(-55px) !important;
}

.modal-backdrop{
  background-color: rgba(0,0,0,0.45);
  z-index: 1000000;
}

.modal.show {
  display: block;
  z-index: 1000;
}

.eula-content{
  max-height: 45vh;
  overflow-y: scroll;
}
</style>