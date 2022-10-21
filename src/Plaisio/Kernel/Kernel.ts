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
  public static readonly eventTypeAllModulesLoaded: string = '2a6aedda-9abd-4490-898d-d7acc898cc29';

  /**
   * Event triggered when a beefy HTMl snippet has been added to the HTML document.
   */
  public static readonly eventTypeBeefyHtmlAdded: string = 'b65beb48-c06e-4bff-93cb-2dc6b5b4b619';

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
   * Installs an observer for a Kernel.eventTypeBeefyHtmlAdded event.
   *
   * @param handler The function to called on a Kernel.eventTypeBeefyHtmlAdded event.
   */
  public static onBeefyHtmlAdded(handler: (event: TriggeredEvent, $html: JQuery) => void)
  {
    $('body').on(Kernel.eventTypeBeefyHtmlAdded, handler);
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
    if (window.hasOwnProperty('php_plaisio_inline_js'))
    {
      // @ts-ignore
      eval(php_plaisio_inline_js);
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
      Kernel.beefyHtmlAdded($body);
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
// Plaisio\Console\Helper\TypeScript\TypeScriptMarkHelper::md5: 61504527fd673038e70aae28ada57fc0
