import * as $ from 'jquery';
import TriggeredEvent = JQuery.TriggeredEvent;

/**
 * The TypeScript kernel of PhpPlaisio.
 */
export class Kernel
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Event triggered when all modules are loaded.
   */
  private static readonly eventTypeAllModulesLoaded: string = '2a6aedda-9abd-4490-898d-d7acc898cc29';

  /**
   * Event triggered when a beefy HTMl snippet has been added to the HTML document.
   */
  private static readonly eventTypeBeefyHtmlAdded: string = 'b65beb48-c06e-4bff-93cb-2dc6b5b4b619';

  /**
   * Event triggered when a HTML element visibility has been toggled.
   */
  private static readonly eventTypeVisibilityToggled: string = 'b6dcc00c-11d1-439d-89ce-4bfeb457d1b6';


  /**
   * A unique constant for identifying the main script element. Must align with the ID in package
   * plaisio/web-assets-core.
   */
  private static readonly mainId: string = '32313ac1-c9eb-4464-a1fc-033544830ffa';

  /**
   * The singleton instance of this class.
   */
  private static instance: Kernel;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   */
  private constructor()
  {
    this.evalPhpPlaisioInlineJs();
    this.installObservers();
    Kernel.triggerAllModulesLoaded();
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers a Kernel.eventTypeBeefyHtmlAdded event for an HTML snippet that has been added to the HTML document.
   *
   * @param $html The jQuery object of the added HTML snippet.
   *
   * @deprecated Use triggerBeefyHtmlAdded() instead.
   */
  public static beefyHtmlAdded($html: JQuery): void
  {
    $('body').trigger(Kernel.eventTypeBeefyHtmlAdded, [$html]);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Returns the singleton instance of the class.
   */
  public static getInstance(): Kernel
  {
    return this.instance || (this.instance = new this());
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs an observer for a Kernel.eventTypeAllModulesLoaded event.
   *
   * @param handler The function to be called on a Kernel.eventTypeAllModulesLoaded event.
   */
  public static onAllModulesLoaded(handler: (event: TriggeredEvent, $html: JQuery) => void)
  {
    $('body').on(Kernel.eventTypeAllModulesLoaded, handler);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs an observer for a Kernel.eventTypeBeefyHtmlAdded event.
   *
   * @param handler The function to be called on a Kernel.eventTypeBeefyHtmlAdded event.
   */
  public static onBeefyHtmlAdded(handler: (event: TriggeredEvent, $html: JQuery) => void)
  {
    $('body').on(Kernel.eventTypeBeefyHtmlAdded, handler);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs an observer for a Kernel.eventTypeVisibilityToggled event.
   *
   * @param handler The function to be called on a Kernel.eventTypeVisibilityToggled event.
   */
  public static onVisibilityToggled(handler: (event: TriggeredEvent, $html: JQuery) => void)
  {
    $('body').on(Kernel.eventTypeVisibilityToggled, handler);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers a Kernel.eventTypeBeefyHtmlAdded event for an HTML snippet that has been added to the HTML document.
   *
   * @param $html The jQuery object of the added HTML snippet.
   */
  public static triggerBeefyHtmlAdded($html: JQuery): void
  {
    $('body').trigger(Kernel.eventTypeBeefyHtmlAdded, [$html]);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers a Kernel.eventTypeVisibilityToggled event for an HTML snippet whose visibility has been toggled.
   *
   * @param $html The jQuery object of the top HTML element.
   */
  public static triggerVisibilityToggled($html: JQuery): void
  {
    $('body').trigger(Kernel.eventTypeVisibilityToggled, [$html]);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers Kernel.eventTypeAllModulesLoad after all modules are loaded.
   */
  private static triggerAllModulesLoaded(): void
  {
    // @ts-ignore
    if (requirejs.s && $.isEmptyObject(requirejs.s.contexts._.registry))
    {
      $('body').trigger(Kernel.eventTypeAllModulesLoaded);
    }
    else
    {
      setTimeout(Kernel.triggerAllModulesLoaded, 25);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Executes JavaScript code dynamically generated in PHP.
   */
  private evalPhpPlaisioInlineJs(): void
  {
    const phpInlineJs = $('script[id=' + $.escapeSelector(Kernel.mainId) + ']').attr('data-php-inline-js');
    if (phpInlineJs)
    {
      eval(phpInlineJs);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs all observers.
   */
  private installObservers(): void
  {
    const $body = $('body');
    $body.on(Kernel.eventTypeAllModulesLoaded, function ()
    {
      Kernel.triggerBeefyHtmlAdded($body);
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
// Plaisio\Console\TypeScript\Helper\MarkHelper::md5: b1d8145a212e5c63ce4f2f71abb0dee2
